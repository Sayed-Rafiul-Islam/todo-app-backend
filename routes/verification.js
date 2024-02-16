const express = require('express');
const router = express.Router()

const { userAuthViaToken } = require("../middlewares/auth");
const { verify } = require('../controllers/verificationController');


router.get('/verify',userAuthViaToken, verify)

module.exports = router