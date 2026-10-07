const db = require('../db/db');

const isSuperAdmin = (email,callback)=>{
    const check = `SELECT * FROM admins WHERE email = ?`;
    db.query(check,[email],callback);
};

const checksuperAdminExists = (callback) => {
    const sql = `SELECT * FROM admins LIMIT 1`;
    db.query(sql, callback);
};

const registerSuperAdmin = (name,email,password,callback)=>{
    const sql =  `INSERT INTO admins (name, email, password)VALUES (?, ?, ?)`;

    db.query(sql,[name,email,password],callback);
};

module.exports = {isSuperAdmin,registerSuperAdmin,checksuperAdminExists};