const express = require('express');
const { Admincontroller, AdminLogin } = require('../controller/admincontroller');
const { superMiddleware } = require('../middleware/superMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router2 = express.Router();

router2.post('/Junior_Admin_register',authMiddleware,superMiddleware('SuperAdmin'),Admincontroller);
router2.post('/junior_Admin_Login',AdminLogin);


module.exports = router2;