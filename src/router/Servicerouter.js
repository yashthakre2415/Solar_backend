const express = require('express');
const { CreateService, GetAllServices, GetServiceById, AssignEmployee, StartService, HoldService, ResumeService, CompleteService, GetHistoryByCustomerID } = require('../controller/Servicecontroller');
const authMiddleware = require('../middleware/authMiddleware');
const routerService = express.Router();

routerService.post('/service_create',authMiddleware,CreateService);
routerService.get('/services',authMiddleware,GetAllServices);
routerService.get('/services/:id',authMiddleware,GetServiceById);
routerService.put('/services/:id/Assign',authMiddleware,AssignEmployee);
routerService.put('/services/:id/Start',authMiddleware,StartService);
routerService.put('/services/:id/Hold',authMiddleware,HoldService);
routerService.put('/services/:id/Resume',authMiddleware,ResumeService);
routerService.put('/services/:id/Complete',authMiddleware,CompleteService);
routerService.get('/services/:id/History',authMiddleware,GetHistoryByCustomerID);
module.exports = routerService;