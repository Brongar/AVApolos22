const express = require('express');
const controller = require('../controllers/export');

const router = express();

// POST /export/run -> Run export
router.post('/run', controller.run);
// GET /export/{instance} -> List exports by instance
router.get('/:instance', controller.listByInstance);
// GET /export/{instance}/{iteration} -> Get export archive by instance and iteration
router.get('/:instance/:iteration', controller.getExportFromInstanceAndIteration);

module.exports = router;
