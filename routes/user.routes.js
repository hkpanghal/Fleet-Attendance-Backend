import { findUser, handleForgotPassword, handleResetPassword, handleSignIn, handleSignOut, handleSignUp } from "../controllers/user.controllers.js"
import express from "express"

const userRouter = express.Router()

userRouter.post("/signup",handleSignUp)
userRouter.post("/signin",handleSignIn)
userRouter.get("/signout",handleSignOut)

userRouter.get("/finduser",findUser)
userRouter.post("/forgotpassword",handleForgotPassword)
userRouter.post("/resetpassword",handleResetPassword)

export { userRouter}