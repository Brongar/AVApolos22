const express = require('express')

const router = express.Router()

const recordRoutes = require('./routes/record')
router.use(recordRoutes)

module.exports = router