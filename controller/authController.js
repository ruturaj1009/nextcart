import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
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

export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

  export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products","-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Geting Orders",
        error,
      });
    }
  };

  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Geting Orders",
        error,
      });
    }
  };

  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };

export const testController = (req,res) =>{
    res.send("rutu here");
};