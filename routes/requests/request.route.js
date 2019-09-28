const express = require("express");
const router = express.Router();
const passport = require('passport');

const requestController = require('../../controllers/requests/request.controller');

const auth = passport.authenticate('jwt', { session: false });

// create user
router.post('/create', auth, requestController.create);
// get all user's requests
router.get('/getRequest', auth, requestController.getAllRequests);
// delete current request
router.get('/deleteRequest/:id', requestController.cancelRequest);

module.exports = router;