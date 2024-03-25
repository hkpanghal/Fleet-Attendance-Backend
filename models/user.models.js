import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    confirm_password: {
        type:String,
        required:true
    },
   
},{timestamps:true})

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return ;
    }
    
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        this.confirm_password = hashedPassword
    } catch (error) {
        console.log(error);
    }

});

export const User = mongoose.model("User",userSchema)