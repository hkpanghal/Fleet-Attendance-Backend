import express from "express";
import { getAttendances, handleCreateAttendance } from "../controllers/attendance.controller.js";

const attendanceRouter = express.Router()

attendanceRouter.post("/",getAttendances)
attendanceRouter.post("/createattendance",handleCreateAttendance)

export {attendanceRouter}

