const express = require('express');
const multer  = require('multer')
const controller = require('../controllers/import');

const router = express();

// POST /import/run -> Run import
const importUploader = multer();
router.post('/run', controller.run);

// POST /import -> upload import archive
router.post('/', importUploader.single('archive'), controller.uploadArchive);

// GET /export/{instance} -> List exports by instance
// router.get('/:instance', controller.listByInstance);
// // GET /export/{instance}/{iteration} -> Get import archive by instance and iteration
// router.get('/:instance/:iteration', controller.getDownloadURLFromInstanceAndIteration);

module.exports = router;
