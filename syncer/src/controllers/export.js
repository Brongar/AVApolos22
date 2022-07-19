const service = require('../services/export');

/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const run = async (req, res) => {
  await service.run();
  res.sendStatus(200);
}

/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const listByInstance = async (req, res) => {
  const instance = req.params.instance;

  if (instance != "IES" && instance != "POLO") {
    return res.status(400).json({
      success: false,
      message: "Instância incorreta!"
    })
  }

  try {
    const exports = await service.listByInstance(instance)
    res.json({ success: true, exports })
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
}

/**
 * @param  {} req
 * @param  {import('express').Response} res
 */
const getExportFromInstanceAndIteration = async (req, res) => {
  const instance = req.params.instance;
  const iteration = req.params.iteration;
  
  try {
    const stream = await service.getExportFromInstanceAndIteration(instance, iteration);
    res.attachment(`${instance}-${iteration}.tgz`);
    stream.pipe(res);
  } catch (e) {
    res.status(500).json({ success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' })
    console.log(e)
  }
}

module.exports = {
  run,
  listByInstance,
  getExportFromInstanceAndIteration,
};
