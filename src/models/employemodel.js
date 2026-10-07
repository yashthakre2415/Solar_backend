const db = require('../db/db');

const EmployeCreate = (name,mobile,email,designation,address,callback)=>{
    const employesql = `INSERT INTO employees(name, mobile, email,designation,address)VALUES (?, ?, ?, ?, ?)`;
    db.query(employesql,[name,mobile,email,designation,address],callback);
}

const getAllEmployees = (callback) => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, callback);
};

const getEmployeeById = (id, callback) => {
    const sql = `
        SELECT * FROM employees
        WHERE id = ?
    `;
    db.query(sql, [id], callback);
};

const updateEmployee = (
    id,
    name,
    mobile,
    email,
    designation,
    address,
    callback
) => {

    const sql = `
        UPDATE employees
        SET
            name = ?,
            mobile = ?,
            email = ?,
            designation = ?,
            address = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, mobile, email, designation, address, id],
        callback
    );
};

const deleteEmployee = (id, callback) => {
    const sql = `
        DELETE FROM employees
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};
module.exports = {EmployeCreate,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee};