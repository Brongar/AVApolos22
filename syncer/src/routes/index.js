const express = require('express');

const exportRoutes = require('./export');
const importRoutes = require('./import');

const rootRouter = express();

rootRouter.use('/export', exportRoutes);
rootRouter.use('/import', importRoutes);

module.exports = rootRouter;
