import express from "express";
import {  findAllStudentsByIds, handleCreateStudent, handledDeleteStudent, updateStudentDetails } from "../controllers/student.controllers.js";

const studentRouter = express.Router()

studentRouter.post("/",findAllStudentsByIds)
studentRouter.post("/createstudent",handleCreateStudent)
studentRouter.delete("/deletestudent/:class_id/:student_id",handledDeleteStudent)
studentRouter.patch("/updatestudent",updateStudentDetails)

export {studentRouter}