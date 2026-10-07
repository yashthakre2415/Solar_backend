const {EmployeCreate, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee} = require("../models/employemodel");

const Employeecontroller = (req, res) => {
    try {
        const { name, mobile, email ,designation, address } = req.body;
        if (!name || !mobile || !email || !designation || !address) {
            return res.status(400).json({
                message: 'Please fill all requirements',
                success: false
            });
        }
        EmployeCreate(name,mobile,email,designation,address,(err, result) => {
                if(err) {
                    console.log('Something went wrong', err);
                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }
                return res.status(201).json({
                    message: 'Employee registration successful',
                    success: true,
                    Employee: {id: result.insertId,name,mobile,email,designation,address}
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

const GetAllEmployees = (req, res) => {
    try {
        getAllEmployees((err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Employees fetched successfully',
                success: true,
                employees: result
            });
        });
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const GetEmployeeById = (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Employee ID is required',
                success: false
            });
        }

        getEmployeeById(id, (err, result) => {

            if (err) {
                console.log('Something went wrong', err);

                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Employee not found',
                    success: false
                });
            }

            return res.status(200).json({
                message: 'Employee found',
                success: true,
                employee: result[0]
            });
        });

    } catch (err) {
        console.log('Internal server error', err);

        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const UpdateEmployee = (req, res) => {
    try {
        const { id } = req.params;
        const {name,mobile,email,designation,address} = req.body;
        if (!id) {
            return res.status(400).json({
                message: 'Employee ID is required',
                success: false
            });
        }
        if (!name || !mobile || !email || !designation || !address) {
            return res.status(400).json({
                message: 'Please fill all requirements',
                success: false
            });
        }
        updateEmployee(id,name,mobile,email,designation,address,(err, result) => {
                 if (err) {
                    console.log('Something went wrong', err);

                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }
                if (result.matchedRows === 0) {
                    return res.status(404).json({
                        message: 'Employee not found',
                        success: false
                    });
                }

                return res.status(200).json({
                    message: 'Employee updated successfully',
                    success: true
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

const DeleteEmployee = (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Employee ID is required',
                success: false
            });
        }

        deleteEmployee(id, (err, result) => {

            if (err) {
                console.log('Something went wrong', err);

                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }

            if (result.matchedRows === 0) {
                return res.status(404).json({
                    message: 'Employee not found',
                    success: false
                });
            }

            return res.status(200).json({
                message: 'Employee deleted successfully',
                success: true
            });
        });

    } catch (err) {
        console.log('Internal server error', err);

        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};
module.exports = {Employeecontroller,GetAllEmployees,GetEmployeeById,UpdateEmployee,DeleteEmployee};