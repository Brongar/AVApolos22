const service = require('../services/import');

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
const uploadArchive = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'you need to provide an import archive.'});
}

module.exports = {
  run,
};
