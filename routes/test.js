const express = require('express');
const router = express.Router();

const controller = require('../controllers/test');

router.get('/test', controller.test);

module.exports = router;
