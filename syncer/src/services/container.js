const Docker = require('dockerode');

const docker = new Docker({ socketPath: "/var/run/docker.sock" })

const getByName = async (name) => {
  const containers = await docker.listContainers({ all: true });
  const found = containers.find((container) => container.Names.find((cname) => cname == `/${name}`));

  if (!found) throw Error(`ContainerError: container with name ${name} not found.`)

  return found
}

const stop = async (containerName) => {
  const container = docker.getContainer((await getByName(containerName)).Id);
  try {
    await container.stop()
  } catch (error) {
    if (error.reason == 'container already stopped') return
    throw error
  }
}

const start = async (containerName) => {
  const container = docker.getContainer((await getByName(containerName)).Id);
  try {
    await container.start()
  } catch (error) {
    if (error.reason == 'container already started') return
    throw error
  }
}

const restart = async (containerName) => {
  const container = docker.getContainer((await getByName(containerName)).Id);
  await container.restart();
}

const getVolumeMountpointByContainer = async (containerName, volumePath) => {
  const container = await getByName(containerName);

  console.log(container)
  const found = container.Mounts.find((mount) => mount.Destination == volumePath)
  if (!found) throw Error(`ContainerError: volume with internal path ${volumePath} not found.`)

  const volume = await docker.getVolume(found.Name).inspect()
  return volume.Mountpoint
}

const getIpByName = async (name) => {
  const container = docker.getContainer((await getByName(name)).Id)
  const networks = (await container.inspect()).NetworkSettings.Networks
  return networks[Object.keys(networks)[0]].IPAddress
}

function runExec(container) {

  var options = {
    Cmd: ['bash', '-c', 'echo test $VAR'],
    Env: ['VAR=ttslkfjsdalkfj'],
    AttachStdout: true,
    AttachStderr: true
  };

  container.exec(options, function(err, exec) {
    if (err) return;
    exec.start(function(err, stream) {
      if (err) return;

      container.modem.demuxStream(stream, process.stdout, process.stderr);

      exec.inspect(function(err, data) {
        if (err) return;
        console.log(data);
      });
    });
  });
}

const runCommand = async(containerName, command) => {
  const container = docker.getContainer((await getByName(containerName)).Id);
  const execOptions = {
    Cmd: command,
    AttachStdout: true,
    AttachStderr: true,
  };

  container.exec(execOptions, (err, exec) => {
    if (err) throw err;
    exec.start((err, stream) => {
      if (err) throw err;
      container.modem.demuxStream(stream, process.stdout, process.stderr);

      exec.inspect((err, data) => {
        if (err) throw err;
        return data;
      })
    })
  })
}

// const _main = async() => {
//   console.log(await runCommand("moodle", [ "ls" ]))
// }

// _main()

module.exports = {
  getByName,
  start,
  stop,
  restart,
  getVolumeMountpointByContainer,
  getIpByName,
  runCommand,
};
