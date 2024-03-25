import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        default:""
    },
    roll_number:{
        type:String,
        required:true,

    },
    is_present:{
        type:Boolean,
        default:false,
    },
    class_belongs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

export const Student = mongoose.model("Student",studentSchema)