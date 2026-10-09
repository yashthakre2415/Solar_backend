const express = require('express');
const {UpdateMonthlySalary,GetMonthlySalary, CalculateMonthlySalary} = require('../controller/Salarycontroller');
const authMiddleware = require('../middleware/authMiddleware');
const salaryrouter = express.Router();


salaryrouter.put('/salary/:userId',authMiddleware,UpdateMonthlySalary);
salaryrouter.get('/salary/:userId',authMiddleware,GetMonthlySalary);
salaryrouter.get('/salary/:userId/calculate',authMiddleware,CalculateMonthlySalary);

module.exports = salaryrouter;