const { Adminregister, isAdmin } = require("../models/adminmodel");
const jwt = require('jsonwebtoken');

const Admincontroller = (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            console.log('please fill all requirement');
            return res.status(400).json({message:'please fill all requirement',success:false});
        }
        isAdmin(email,(err,result)=>{
            if(err){
                console.log('something went wrong');
                return res.status(400).json({message:'something went wrong',success:false});
            }
             if (result.length > 0) {
                return res.status(409).json({
                    message: 'Junior Admin already exists',
                    success: false
                });
            }
        })
       Adminregister(name,email,password,(err,result)=>{
            if(err){
                console.log('something went wrong');
                return res.status(500).json({message:'something went wrong',success:false});
            }
           return res.status(201).json({message:'Junior admin registration successfully',success:true,junioradmin:{
            name,email
           }});
        })
    }catch(err){
         console.log('internal server error',err);
         return res.status(500).json({message:'Internal server error',err});
    }
}

const AdminLogin = (req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password){
        console.log('Enter Email or Password');
        return res.status(400).json({message:'Email and password are required',success:false});
    }
    isAdmin(email,(err,result)=>{
        if(err){
            console.log('something went wrong');
            return res.status(500).json({message:'something went wrong',success:false});
        }
        if(result.length === 0 ){
            console.log('Admin not found');
            return res.status(404).json({message:'Admin not found',success:false});
        }
         const JuniorAdmin = result[0];
       
        if (JuniorAdmin.password !== password) {
                return res.status(401).json({
                    message: 'Incorrect password',
                    success: false
                });
            }
            const token = jwt.sign(
             {
             id: JuniorAdmin.id,
             email: JuniorAdmin.email,
             role: 'JuniorAdmin'
             },
             process.env.JWT_SECRET,
             {
             expiresIn: '7d'
            }
);
             return res.status(200).json({
                message: 'Junior Admin login successful',
                success: true,
                token,
                JuniorAdmin: {
                    id: JuniorAdmin.id,
                    name: JuniorAdmin.name,
                    email: JuniorAdmin.email
                }
            });
        });
}catch(err){
     console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}
module.exports = {Admincontroller,AdminLogin};