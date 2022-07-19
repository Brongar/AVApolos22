const express = require('express')
const recordController = require('../controllers/record')

const router = express.Router()

router.put('/v1/record', recordController.putRecordIpByHost)
router.get('/v1/record', recordController.getRecordIpByHost)

module.exports = router