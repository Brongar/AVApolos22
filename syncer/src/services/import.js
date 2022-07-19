const compressing = require('compressing');
const config = require('../config')
const fs = require('fs-extra');
const { nanoid } = require('nanoid');
const { Pool } = require("pg");
const objstore = require('./objstore')
const container = require('./container');

const db = new Pool(config.db)

const getLastImport = async() => {
  const sql = `SELECT max(iteration) FROM avapolos_sync WHERE instance='${config.instance}' AND operation='I'`;
  const result = (await db.query(sql)).rows[0].max;

  if (!result) return 0
  return result
}

const getNextImport = async() => {
  const lastImport = await getLastImport()
  return lastImport + 1;
}

const createControlRecord = async(iteration) => {
  const sql = `INSERT INTO avapolos_sync(instance,iteration,operation) VALUES ('${config.instance}', '${iteration}', 'I')`;
  await db.query(sql)
}

const resolveImportName = (instance, iteration) => `${instance}.${iteration}.tgz`;

const run = async () => {
  console.log('importing')  
  const nextImport = await getNextImport()
  const importName = 'IES.1.tgz';
  // const importName = resolveImportName(config.instance, nextImport);
  const tmpPath = `/tmp/avapolos_syncer/${nanoid(8)}`;
  const tmpImportPath = `${tmpPath}/import.tgz`;
  const tmpImportDataPath = `${tmpPath}/import`;
  const syncDataPath = await container.getVolumeMountpointByContainer(config.replication.sync, "/var/lib/postgresql/data");
  const moodledataFiledirPath = `${await container.getVolumeMountpointByContainer('moodle', "/app/moodledata")}/filedir`;

  // const nextImport = 50
  console.log(`next iteration: ${nextImport}`)

  if (! await objstore.has(config.minio.exportsBucket, importName)) throw new Error('import archive was not found');

  await objstore.get(config.minio.exportsBucket, importName, tmpImportPath);
  await compressing.tgz.uncompress(tmpImportPath, tmpImportDataPath);

  console.log(`${tmpImportDataPath}/database`)
  console.log(syncDataPath)

  await fs.rmdir(syncDataPath, { recursive: true });
  await fs.copy(`${tmpImportDataPath}/database`, syncDataPath, { recursive: true });

  await container.stop(config.replication.main);
  await container.start(config.replication.sync);
  await container.start(config.replication.main);

  waitForHealthy(async () => {
    await db.query("SELECT bdr.wait_slot_confirm_lsn(NULL, NULL)");
    console.log('stopping sync db')
    container.stop(config.replication.sync);
    return;
  })

  await createControlRecord(nextImport);
  await container.runCommand('moodle', ["php",  "/app/public/admin/cli/purge_caches.php"])
  await container.restart('moodle');
  return
}

module.exports = {
  run
};
