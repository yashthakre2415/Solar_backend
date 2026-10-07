const express = require('express');
const { Customercontroller, GetAllCustomers, GetCustomerById, UpdateCustomer, DeleteCustomer } = require('../controller/customercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router1 = express.Router();

router1.post('/Customer_Create',authMiddleware,Customercontroller);
router1.get('/Customers',authMiddleware,GetAllCustomers)
router1.get('/Customers/:id',authMiddleware, GetCustomerById);
router1.put('/Customers/:id', authMiddleware, UpdateCustomer);
router1.delete('/Customers/:id',authMiddleware,DeleteCustomer)
module.exports = router1;