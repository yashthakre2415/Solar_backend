const {createAttendance,getAttendanceByEmployee,getAttendanceSummary} = require('../models/Attendancemodel');
const CreateAttendance = (req, res) => {
    try {
        const { employee_id, attendance_date, status} = req.body;
        if (!employee_id || !attendance_date || !status) {
            return res.status(400).json({
                message: 'Employee ID, attendance date and status are required',
                success: false
            });
        }
        const allowedStatus = [  'present','paid_leave','unpaid_leave','half_day','absent'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: 'Status must be present, paid_leave, unpaid_leave, half_day or absent',
                success: false
            });
        }
        createAttendance(employee_id,attendance_date,status,(err, result) => {
                if (err) {
                    console.log('Something went wrong', err);

                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }
                return res.status(201).json({
                    message: 'Attendance created successfully',
                    success: true,
                    attendance: {
                        id: result.insertId,
                        employee_id,
                        attendance_date,
                        status
                    }
                });
            }
        );
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const GetAttendanceByEmployee = (req, res) => {
    try {
        const { employee_id } = req.params;
        const { month, year } = req.query;

        if (!employee_id || !month || !year) {
            return res.status(400).json({
                message: 'Employee ID, month and year are required',
                success: false
            });
        }

        getAttendanceByEmployee(employee_id,month,year,(err, result) => {
                if (err) {
                    console.log('Something went wrong', err);
                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }

                return res.status(200).json({
                    message: 'Attendance fetched successfully',
                    success: true,
                    records: result
                });
            }
        );
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const GetAttendanceSummary = (req, res) => {
    try {
        const { employee_id } = req.params;
        const { month, year } = req.query;

        if (!employee_id || !month || !year) {
            return res.status(400).json({
                message: 'Employee ID, month and year are required',
                success: false
            });
        }
        getAttendanceSummary(employee_id,month,year,(err, result) => {
                if (err) {
                    console.log('Something went wrong', err);
                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }

                return res.status(200).json({
                    message: 'Attendance summary fetched successfully',
                    success: true,
                    summary: result[0]
                });
            }
        );
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


module.exports = {CreateAttendance,GetAttendanceByEmployee,GetAttendanceSummary};