const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()
const { logger } = require('./logger')
const config = require('./config')

app.use(helmet())

app.use(bodyParser.json())

const authRoutes = require('./routes/auth/routes')

app.use(authRoutes)

app.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({
        message: err
    })
})

app.listen(config.server.port, () => logger.info(`listening on port: ${config.server.port}`))
