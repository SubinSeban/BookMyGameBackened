var express = require('express');
var router = express.Router();
const { doSignUp, doLogin }= require('../controllers/authController')

/* GET home page. */
router.post('/dosignup', doSignUp);
router.post('/dologin', doLogin);
module.exports = router;