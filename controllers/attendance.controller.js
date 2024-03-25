import { Attendance } from "../models/attendance.models.js"

export const  handleCreateAttendance = async (req,res) =>{

   
    const attendance = await Attendance.create(req.body)

    if(!attendance){
        return res.status(400).json({success:false,msg:"some error occured while creating the attendance"})
    }

    return res.status(200).json({success:true,msg:"attendance created successfully",attendance})

}

export const getAttendances = async (req,res) => {

    // const selectedDate = new Date(req.body.selectedDate);
    const attendances = await Attendance.find({class_id:req.body.class_id,created_by:req.body.user_id}).populate("class_id").exec()

    if(!attendances){
        return res.status(400).json({success:false,msg:"no data found with provided details"})
    }

   
    return res.status(200).json({success:true,msg:"data found",attendances})

}


