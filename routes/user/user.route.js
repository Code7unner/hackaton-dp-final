const express = require("express");
const router = express.Router();

const userController = require('../../controllers/user/user.controller');

// create user
router.post('/create', userController.create);
// login
router.post('/login', userController.login);

module.exports = router;