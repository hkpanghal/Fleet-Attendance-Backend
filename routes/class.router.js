import express from "express";
import { handleCreateClass, handleDeleteClass, handleGetClasses, handleRenameClass } from "../controllers/class.controllers.js";

const classRouter = express.Router()

classRouter.post("/",handleGetClasses)
classRouter.post("/createclass",handleCreateClass)
classRouter.patch("/renameclass", handleRenameClass)
// classRouter.delete("/deleteclass",handleDeleteClass)

export {classRouter}