const express = require('express');
const router = express.Router();
const urlController = require('../controllers/controller');

router.post('/', urlController.createShortUrl);
router.get('/:id', urlController.getUrlDetails);
router.get('/', urlController.getAllUrls);
router.patch('/:id', urlController.updateUrl);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;
