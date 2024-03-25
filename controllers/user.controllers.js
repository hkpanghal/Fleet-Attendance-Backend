import fs from "fs"
import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { transporter } from "../utils/sendmail.js"

export const handleSignUp = async (req,res) => {

    try {
        const user = await User.create({...req.body})
        user.save()
        return res.status(200).json({success:true,msg:"user created successfully",user})
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,msg:error})
    }
    
    
}
export const handleSignIn = async (req,res) => {
   
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({success:false,msg:"email and password required"})
    }

    try {
        const user = await User.findOne({email})
        const hashedPassword = user.password
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(result){
                return res.status(200).json({success:true,msg:"correct details",user})
            }
            
            return res.status(401).json({success:false,msg:"incorrect password"})

        });
    } catch (error) {
        
        return res.status(400).json({success:false,msg:"user did not exist with provided email and password"})

    }
}


export const handleSignOut= async (req,res) => {
    
}

export const findUser = async (req,res) => {

    const user = await User.findOne({...req.body})

    if(user){

        return res.status(200).json({success:true,msg:user})
    }
    return res.status(400).json({success:false,msg:"user not exits"})

}

export const handleForgotPassword = async (req,res) => {

    const user = await User.findOne({...req.body})

    if(!user){
        return res.status(400).json({success:false,msg:"user not exits"})
    }

    const token = crypto.randomBytes(20).toString('hex');
  
    // Send password reset email
    
    const mailOptions = {
      to: req.body.email,
      subject: 'Password Reset',
      text: `use this token to reset your password : ${user.password}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(401).json({success:false,msg:`some error occurred while sending mail please try again`});
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({success:true,msg:`password reset email sent to ${user.email}`});
        
      }
    });
  
   

}

export const handleResetPassword = async (req,res) => {

    const user = await User.findOne({password:req.body.token})
    if(user){
        user.password = req.body.new_password
        user.confirm_password = req.body.confirm_new_password

        await user.save()

        return res.status(200).json({success:true,msg:"password updated successfully"})
    }

    return res.status(400).json({success:false,msg:"token did not match, user did not exists with the provided token"})

}
