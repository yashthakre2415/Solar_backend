const express = require('express');
const { Employeecontroller, GetAllEmployees, GetEmployeeById, UpdateEmployee, DeleteEmployee } = require('../controller/employecontroller');
const authMiddleware = require('../middleware/authMiddleware');
const routerEmploye = express.Router();

routerEmploye.post('/Employe_create',authMiddleware,Employeecontroller);
routerEmploye.get('/Employees',authMiddleware,GetAllEmployees);
routerEmploye.get('/Employees/:id',authMiddleware,GetEmployeeById);
routerEmploye.put('/Employees/:id',authMiddleware,UpdateEmployee);
routerEmploye.delete('/Employees/:id',authMiddleware,DeleteEmployee);
module.exports = routerEmploye;
