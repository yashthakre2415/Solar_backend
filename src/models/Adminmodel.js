const db = require('../db/db');

const Adminregister = (name,email,password,callback)=>{
    const adminregister = `
        INSERT INTO junior_admins
        (name, email, password)
        VALUES (?, ?, ?)
    `;
    db.query(adminregister,[name,email,password],callback);
}

const isAdmin = (email,callback)=>{
const isadmin = `
        SELECT * FROM junior_admins
        WHERE email = ?
    `;
    db.query(isadmin,[email],callback);
}

module.exports = {Adminregister,isAdmin};