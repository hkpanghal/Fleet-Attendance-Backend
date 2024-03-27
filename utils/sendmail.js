import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()




export const  transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user:process.env.MAILTRAPUSER,
    pass:process.env.MAILTRAPPASS
  }
});



