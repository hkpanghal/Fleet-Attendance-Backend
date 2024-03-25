import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    subject_name:{
        type:String
    },
   class_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Class",
    required:true
   },
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   students:[]

},{timestamps:true})

export const Attendance = mongoose.model("Attendance",attendanceSchema)