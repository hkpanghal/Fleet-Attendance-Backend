import { Class } from "../models/class.models.js"

export const handleCreateClass = async (req,res) => {

    const clas = await Class.create({
        class_name:req.body.class_name,
        created_by:req.body.user_id,
    })
    if(clas){
        return res.status(200).json({success:true,msg:"class created successfully",clas})
    }

    return res.status(400).json({success:false,msg:"some error occurred while creating the class"})
}
export const handleRenameClass = async (req,res) => {
    // console.log(req.body.class_id,req.body.user_id,req.body.class_name)
    const clas = await Class.findOne({_id:req.body.class_id,created_by:req.body.user_id})

    if(!clas){
        return res.status(400).json({success:false,msg:"No data found to update based on provided details"})
  
    }

    clas.class_name = req.body.class_name
    await clas.save()
    return res.status(200).json({success:true,msg:"class name updated successfully",data:clas})
}
export const handleDeleteClass = async (req,res) => {
    // const clas = await Class.findById(req.body.class_id)

    // if(clas){
    //     clas.students.map(id => )
    // }
    // const result = await Class.findOneAndDelete({_id:req.body.class_id})
    
}
export const handleGetClasses = async (req,res) => {
   
    const classes = await Class.find({created_by:req.body.user_id})
  
    return res.status(200).json({success:true,msg:"classes created by the user",classes})
}