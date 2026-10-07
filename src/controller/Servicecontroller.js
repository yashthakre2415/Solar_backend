const { createService, getAllServices, getServiceById, assignEmployee, startService, holdService, resumeService, completeService, getServiceHistoryByCustomerId } = require("../models/Servicemodel");

const CreateService = (req, res) => {
    try {
        const {customer_id,service_type,problem} = req.body;
        if (!customer_id || !service_type) {
            return res.status(400).json({
                message: 'Customer ID and service type are required',
                success: false
            });
        }
       createService(customer_id,service_type,problem,(err, result) => {
                if (err) {
                    console.log('Something went wrong', err);
                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }
                return res.status(201).json({
                    message: 'Service created successfully',
                    success: true,
                    service: {
                        id: result.insertId,
                        customer_id,
                        service_type,
                        problem,
                        status: 'PENDING'
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

const GetAllServices = (req, res) => {
    try {
        getAllServices((err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Services fetched successfully',
                success: true,
                services: result,
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

const GetServiceById = (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Service ID is required',
                success: false
            });
        }
        getServiceById(id, (err, result) => {

            if (err) {
                console.log('Something went wrong', err);

                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Service not found',
                    success: false
                });
            }

            return res.status(200).json({
                message: 'Service found',
                success: true,
                service: result[0]
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

const AssignEmployee = (req, res) => {
    try {
        const { employee_id } = req.body;
        const { id } = req.params;
        if (!employee_id || !id) {
            return res.status(400).json({
                message: 'Employee ID and Service ID are required',
                success: false
            });
        }
        assignEmployee(employee_id, id, (err, result) => {

            if (err) {
                console.log('Something went wrong', err);

                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }

            return res.status(200).json({
                message: 'Employee assigned successfully',
                success: true
            });
        });

    } catch (err) {

        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const StartService = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Service ID is required',
                success: false
            });
        }
        startService(id, (err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Service started successfully',
                success: true
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const HoldService = (req, res) => {
    try {
        const { id } = req.params;
        const { hold_reason } = req.body;
        if (!id || !hold_reason) {
            return res.status(400).json({
                message: 'Service ID and hold reason are required',
                success: false
            });
        }
        holdService(id, hold_reason, (err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Service put on hold successfully',
                success: true
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const ResumeService = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Service ID is required',
                success: false
            });
        }
        resumeService(id, (err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Service resumed successfully',
                success: true
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const CompleteService = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Service ID is required',
                success: false
            });
        }
        completeService(id, (err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Service completed successfully',
                success: true
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const GetHistoryByCustomerID = (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            console.log('Customer ID is required');
            return res.status(400).json({message:'Customer ID is required',success:false});
        }
        getServiceHistoryByCustomerId(id,(err,result)=>{
        if(err){
            console.log('Something went wrong',err);
            return res.status(500).json({message:'Something went wrong',success:false});
        }
        if(result.length === 0){
            console.log('No History');
            return res.status(404).json({message:'No history',success:false});
        }

        return res.status(200).json({message:'History here',
                                   success:true,
                                   History:result});

       })
    }catch(err){
        console.log(err);
       return res.status(500).json({message:'Internal server error',success:false,err});
    }
}
module.exports = {CreateService,GetAllServices,GetServiceById,AssignEmployee,StartService,HoldService,ResumeService,CompleteService,GetHistoryByCustomerID};