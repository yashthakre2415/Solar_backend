const db = require('../db/db');

const registerCustomer = (name,mobile,email,address,latitude,longitude,callback)=>{
const customersql = `INSERT INTO customers (name,mobile,email,address,latitude,longitude)VALUES (?, ?, ?, ?, ?, ?)`;
db.query(customersql,[name,mobile,email,address,latitude,longitude],callback);
}

const getAllCustomers = (callback) => {
    const sql = `SELECT * FROM customers`;
    db.query(sql, callback);
};

const getCustomerById = (id, callback) => {
    const sql = `
        SELECT * FROM customers
        WHERE id = ?
    `;
    db.query(sql, [id], callback);
};

const updateCustomer = (id,name,mobile,email,address,latitude,longitude,callback) => {
    const sql = `
        UPDATE customers
        SET
            name = ?,
            mobile = ?,
            email = ?,
            address = ?,
            latitude = ?,
            longitude = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, mobile, email, address, latitude, longitude, id],
        callback
    );
};
const deleteCustomer = (id,callback) => {
    const sql = `
        DELETE FROM customers
        WHERE id = ?
    `;
    db.query(sql, [id], callback);
};
module.exports = {registerCustomer,getAllCustomers,getCustomerById,updateCustomer,deleteCustomer};