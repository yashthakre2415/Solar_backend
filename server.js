const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const router = require('./src/router/Superadminrouter');
const router1 = require('./src/router/customerrouter');
const router2 = require('./src/router/adminrouter');
const routerEmploye = require('./src/router/Employerouter');
const routerService = require('./src/router/Servicerouter');
const liverouter = require('./src/router/Liverouter');
const Attendencerouter = require('./src/router/attendancerouter');
const salaryrouter = require('./src/router/salaryrouter');
const expencerouter = require('./src/router/expenserouter');
const salarysliprouter = require('./src/router/SalarySliprouter');
const boardouter = require('./src/router/weeklyleaderboardrouter');
const officerouter = require('./src/router/officeexpenserouter');
const chatrouter = require('./src/router/chatrouter');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use('/SuperAdmin',router);
app.use('/Customer',router1);
app.use('/Junior_Admin',router2);
app.use('/Employe',routerEmploye);
app.use('/Service',routerService);
app.use('/Livelocation',liverouter);
app.use('/Hr',Attendencerouter);
app.use('/Hr',salaryrouter);
app.use('/Hr',expencerouter);
app.use('/Hr',salarysliprouter);
app.use('/Hr',boardouter);
app.use('/admin',officerouter);
app.use('/admin',chatrouter);
app.use('/uploads', express.static('src/uploads'));


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})