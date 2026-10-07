const { registerCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } = require("../models/customermodel");

const Customercontroller = (req,res)=>{
    try{
     const {name,mobile,email,address,latitude,longitude} = req.body;
     if(!name || !mobile || !email || !address || !latitude || !longitude){
        console.log(`fill ${name} ${mobile} ${email} ${address} ${latitude} ${longitude}`);
        return res.status(404).json({message:'Please fill all requirements'});
     }
     registerCustomer(name,mobile,email,address,latitude,longitude,(err,result)=>{
      if(err){
        console.log('something went wrong',err);
        return res.status(500).json({message:'something went wrong',success:false})
      }
       return res.status(200).json({message:'Customer regestration successfully',success:true,Customer:{
        name,mobile,email,address,latitude,longitude
       }})
     })
    }catch(err){
      console.log('Internal server error');
      return res.status(500).json({message:'Internal server error',success:false});
    }
}
const GetAllCustomers = (req, res) => {
    try {
        getAllCustomers((err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Customers fetched successfully',
                success: true,
                Customers: result
            });
        });
    }catch(err){
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const GetCustomerById = (req, res) => {
    try {
        const  {id}  = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Customer ID is required',
                success: false
            });
        }
        getCustomerById(id, (err, result) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Customer not found',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Customer found',
                success: true,
                customer: result[0]
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

const UpdateCustomer = (req, res) => {
    try {
        const { id } = req.params;
        const {name,mobile,email,address,latitude,longitude} = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'Customer ID is required',
                success: false
            });
        }
        if (!name || !mobile || !email || !address || !latitude || !longitude) {
            return res.status(400).json({
                message: 'Please fill all requirements',
                success: false
            });
        }
        updateCustomer(id,name,mobile,email,address,latitude,longitude,(err, result) => {
                if (err) {
                    console.log('Something went wrong', err);

                    return res.status(500).json({
                        message: 'Something went wrong',
                        success: false
                    });
                }
                if (result.matchedRows === 0) {
                    return res.status(404).json({
                        message: 'Customer not found',
                        success: false
                    });
                }
                return res.status(200).json({
                    message: 'Customer updated successfully',
                    success: true
                });
            }
        );
    }catch(err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const DeleteCustomer = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Customer ID is required',
                success: false
            });
        }
        deleteCustomer(id, (err, result) => {
            if (err) {
                console.log('Something went wrong', err);

                return res.status(500).json({
                    message: 'Something went wrong',
                    success: false
                });
            }
            if (result.matchedRows === 0) {
                return res.status(404).json({
                    message: 'Customer not found',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Customer deleted successfully',
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
module.exports = {Customercontroller,GetAllCustomers,GetCustomerById,UpdateCustomer,DeleteCustomer};