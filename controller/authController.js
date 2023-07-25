import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async(req,res) => {
    try {
        const {name, email, password,phone,address,question} = req.body;
        if(!name){
            return res.status(404).send({error:'name is required'});
        }
        if(!email){
            return res.status(404).send({error:'email is required'});
        }
        if(!password){
            return res.status(404).send({error:'password is required'});
        }
        if(!phone){
            return res.status(404).send({error:'phone is required'});
        }
        if(!address){
            return res.status(404).send({error:'address is required'});
        }
        if(!question){
            return res.status(404).send({error:'question is required'});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Registered please login',
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name,email,phone,address,password:hashedPassword,question}).save();
        res.status(201).send({
            success:true,
            message:'Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};


export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email Or Password'
            });
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not Registered'
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            });
        }
        const token = await JWT.sign({_id:user._id}, process.env.JWT_KEY, {expiresIn:"7d"});
        
        res.status(200).send({
            success:true,
            message:'Login Successful',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error,
        })
    }
};

export const forgotpasswordController = async(req,res) =>{
    try {
        const {email, question, newpassword} = req.body;
        if(!email){
            return res.status(404).send({error:'email is required'});
        }
        if(!question){
            return res.status(404).send({error:'answer is required'});
        }
        if(!newpassword){
            return res.status(404).send({error:'New Password is required'});
        }
        
        const user = await userModel.findOne({email,question});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer'
            });
        }
        const hashedPassword = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashedPassword});
        res.status(200).send({
            success:true,
            message:'Password reset Successfully'
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'something went wrong',
            error,
        })
    }
}

export const testController = (req,res) =>{
    res.send("rutu here");
};