const express = require('express');
const {Superadmincontroller,SuperAdminlogin} = require('../controller/Superadmincontroller');

const router = express.Router();

router.post('/SuperAdmin_register',Superadmincontroller);
router.post('/SuperAdmin_Login',SuperAdminlogin)

module.exports = router;