import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    class_name:{
        type:String,
        required:true,
        unique:true
    },

    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }],
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

export const Class = mongoose.model("Class",classSchema)