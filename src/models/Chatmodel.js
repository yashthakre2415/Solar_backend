const db = require('../db/db');

const getchatuser = (callback)=>{
    const sql=`SELECT id,
    username,name,email,profilepic FROM employees ORDER BY name ASC`;

    db.query(sql,callback);
}

const getchathistory = (room,type,callback)=>{
let sql = `SELECT 
            id,
            sender_id,
            receiver_id,
            room,
            type,
            message,
            imageUrl,
            created_at
            FROM chat_message
            WHERE room = ?
            `;

const values = [room];
if(type){
    sql += `AND type = ?`;
    values.push(type);
}
sql += `ORDER BY created_at ASC`;
db.query(sql,values,callback);
};

const createChatMessage = (data, callback) => {
    const sql = `
        INSERT INTO chat_message
        (sender_id, receiver_id, room, type, message, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [data.sender_id,data.receiver_id || null,data.room,data.type || 'text',data.message || null,data.imageUrl || null];
    db.query(sql, values, callback);
};


const createAlert = (title, message, callback) => {
    const sql = `
        INSERT INTO alerts (title, message)
        VALUES (?, ?)
    `;

    db.query(sql, [title, message], callback);
};


const deleteChatMessage = (id, callback) => {
    const sql = `DELETE FROM chat_message WHERE id = ?`;

    db.query(sql, [id], callback);
};
module.exports = {getchatuser,getchathistory,createChatMessage,createAlert,deleteChatMessage};
