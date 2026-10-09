const express = require('express');
const {UpdateEmployeeLocation, GetCurrentEmployeeLocation, GetEmployeeLocationHistory} = require('../controller/LiveLocationcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const liverouter = express.Router();

liverouter.post('/live-user',authMiddleware,UpdateEmployeeLocation);
liverouter.get('/live-user/:userId',authMiddleware,GetCurrentEmployeeLocation);
liverouter.get('/live-user/history/:userId',authMiddleware,GetEmployeeLocationHistory);
module.exports = liverouter;