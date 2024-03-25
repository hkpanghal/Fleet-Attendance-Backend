import { Class } from "../models/class.models.js"
import { Student } from "../models/student.models.js"

export const handleCreateStudent = async (req,res) => {
    const clas = await Class.findById(req.body.class_id)

    if(clas){
        
        const student = await Student.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            roll_number:req.body.roll_number,
            class_belongs:req.body.class_id,
            created_by:req.body.user_id
        })
        

        clas.students.push(student._id)

        await clas.save()
        return res.status(200).json({success:true,msg:"student created successfully",student})
        

    }
    
    return res.status(400).json({success:false,msg:"no class exists with the provided class_id",})
    


}

export const findAllStudentsByIds = async (req,res) => {

    const students = await Student.find({created_by:req.body.user_id,class_belongs:req.body.class_id})

    if(students){
        return res.status(200).json({success:true,msg:"the list of students",students})
    }

    return res.status(400).json({success:false,msg:"no data found ",})

}

export const updateStudentDetails = async (req,res) => {
    const student = await Student.findOne({_id:req.body.student_id,created_by:req.body.user_id})

    if(!student){
        return res.status(400).json({success:false,msg:"no data found based on provided details"})
    }

    student.first_name = req.body.first_name
    student.last_name = req.body.last_name
    student.roll_number = req.body.roll_number

    await student.save()

    return res.status(200).json({success:true,msg:"data updated successfully",student})
}
export const handledDeleteStudent = async (req,res) => {
   
  try {
      const delstudent = await Student.findByIdAndDelete(req.params.student_id)
      const clas = await Class.findById(req.params.class_id)
      
      clas.students = clas.students.filter((id) => id != req.params.student_id)
     
      await clas.save()
  
      return res.status(200).json({success:true,msg:"student deleted successfully",student:delstudent})
  } catch (error) {
    console.log(error)
    return res.status(400).json({success:false,msg:"some error occurred while deleting the student",error:error})
  }

}

