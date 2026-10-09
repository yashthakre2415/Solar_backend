const db = require('../db/db');

const createAttendance = (employee_id, attendance_date, status, callback) => {
    const sql = `
        INSERT INTO attendance
        (employee_id, attendance_date, status)
        VALUES (?, ?, ?)
    `;
    db.query(sql,[employee_id, attendance_date, status],callback);
};

const getAttendanceByEmployee = (employee_id, month, year, callback) => {
    const sql = `
        SELECT
            id,
            employee_id,
            attendance_date,
            status,
            created_at
        FROM attendance
        WHERE employee_id = ?
        AND MONTH(attendance_date) = ?
        AND YEAR(attendance_date) = ?
        ORDER BY attendance_date ASC
    `;
    db.query(sql,[employee_id, month, year],callback);
};

const getAttendanceSummary = (employee_id, month, year, callback) => {
    const sql = `
        SELECT
            COUNT(*) AS totalDays,
            SUM(
                CASE
                    WHEN status = 'present' THEN 1
                    ELSE 0
                END
            ) AS presentCount,
            SUM(
                CASE
                    WHEN status = 'paid_leave' THEN 1
                    ELSE 0
                END
            ) AS paidLeaveCount,

            SUM(
                CASE
                    WHEN status = 'unpaid_leave' THEN 1
                    ELSE 0
                END
            ) AS unpaidLeaveCount,

            SUM(
                CASE
                    WHEN status = 'half_day' THEN 1
                    ELSE 0
                END
            ) AS halfDayCount,

            SUM(
                CASE
                    WHEN status = 'absent' THEN 1
                    ELSE 0
                END
            ) AS absentCount

        FROM attendance

        WHERE employee_id = ?
        AND MONTH(attendance_date) = ?
        AND YEAR(attendance_date) = ?
    `;
    db.query(sql,[employee_id, month, year],callback);
};

module.exports = {createAttendance,getAttendanceByEmployee,getAttendanceSummary};