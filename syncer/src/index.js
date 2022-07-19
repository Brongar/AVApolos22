const express = require('express');
const helmet = require('helmet');

const app = express();
const config = require('./config');
const routes = require('./routes');
const db = require('./db');

app.use(helmet());

app.use(routes);

const _main = async () => {
  await db.init()
  const server = app.listen(config.port, () => {
    console.log(`listening on port: ${config.port}`)
  })
}

_main();
