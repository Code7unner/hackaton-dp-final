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
// update current status
router.post('/update/status/:id', requestController.updateStatusRequest);
// create request by phone call
router.post('/create/call', requestController.createByPhone);
// comment request
router.post('/comment/:id', requestController.comment);

module.exports = router;