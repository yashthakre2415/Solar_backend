const express = require('express');
const {CreateAttendance,GetAttendanceByEmployee,GetAttendanceSummary} = require('../controller/Attendancecontroller');
const authMiddleware = require('../middleware/authMiddleware');
const Attendencerouter = express.Router();


Attendencerouter.post('/attendance',authMiddleware,CreateAttendance);
Attendencerouter.get('/attendance/:employee_id',authMiddleware,GetAttendanceByEmployee);
Attendencerouter.get('/attendance/:employee_id/summary',authMiddleware,GetAttendanceSummary);


module.exports = Attendencerouter;