const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./src/router/Superadminrouter');
const router1 = require('./src/router/customerrouter');
const router2 = require('./src/router/adminrouter');
const routerEmploye = require('./src/router/Employerouter');
const routerService = require('./src/router/Servicerouter');

app.use(express.json());

const PORT = process.env.PORT;
app.use('/SuperAdmin',router);
app.use('/Customer',router1);
app.use('/Junior_Admin',router2);
app.use('/Employe',routerEmploye);
app.use('/Service',routerService);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})