const db = require('../db/db');

const createService = (customer_id,service_type,problem,callback) => {
    const sql = `INSERT INTO services(customer_id, service_type, problem) VALUES (?, ?, ?)`;
    db.query(sql,[customer_id, service_type, problem],callback);
};

const getAllServices = (callback) => {

    const sql = `
        SELECT
            services.id,
            services.customer_id,
            customers.name AS customer_name,
            services.service_type,
            services.problem,
            services.status,
            services.hold_reason,
            services.employee_id,
            services.created_at,
            services.completed_at
        FROM services
        JOIN customers
        ON services.customer_id = customers.id
    `;

    db.query(sql, callback);
};

const getServiceById = (id, callback) => {
    const sql = `
        SELECT
            services.id,
            services.customer_id,
            customers.name AS customer_name,
            services.service_type,
            services.problem,
            services.status,
            services.hold_reason,
            services.employee_id,
            services.created_at,
            services.completed_at
        FROM services
        JOIN customers
        ON services.customer_id = customers.id
        WHERE services.id = ?
    `;
    db.query(sql, [id], callback);
};

const assignEmployee = (employee_id, serviceId, callback) => {

    const sql = `
        UPDATE services
        SET
            employee_id = ?,
            status = 'ASSIGNED'
        WHERE id = ?
    `;

    db.query(sql, [employee_id, serviceId], callback);
};

const startService = (serviceId, callback) => {
    const sql = `
        UPDATE services
        SET
            status = 'IN_PROGRESS'
        WHERE id = ?
    `;
    db.query(sql, [serviceId], callback);
};

const holdService = (serviceId, hold_reason, callback) => {
    const sql = `
        UPDATE services
        SET
            status = 'HOLD',
            hold_reason = ?
        WHERE id = ?
    `;
    db.query(
        sql,
        [hold_reason, serviceId],
        callback
    );
};

const resumeService = (serviceId, callback) => {
    const sql = `
        UPDATE services
        SET
            status = 'IN_PROGRESS',
            hold_reason = NULL
        WHERE id = ?
    `;
    db.query(sql, [serviceId], callback);
};

const completeService = (serviceId, callback) => {
    const sql = `
        UPDATE services
        SET
            status = 'COMPLETED',
            completed_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    db.query(sql, [serviceId], callback);
};

const getServiceHistoryByCustomerId = (id, callback) => {

    const sql = `
        SELECT
            services.id,
            services.customer_id,
            customers.name AS customer_name,
            services.service_type,
            services.problem,
            services.status,
            services.hold_reason,
            services.employee_id,
            services.created_at,
            services.completed_at
        FROM services
        JOIN customers
        ON services.customer_id = customers.id
        WHERE services.customer_id = ?
        ORDER BY services.created_at DESC
    `;

    db.query(sql, [id], callback);
};
module.exports = {createService,getAllServices,getServiceById,assignEmployee,startService,holdService,resumeService,completeService,getServiceHistoryByCustomerId};