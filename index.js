import express from "express"
import { connectDB } from "./utils/connection.js"
import { userRouter } from "./routes/user.routes.js"
import { classRouter } from "./routes/class.router.js"
import { studentRouter } from "./routes/student.router.js"
import { attendanceRouter } from "./routes/attendance.router.js"
import { job } from "./utils/cron.js"


import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 9000

connectDB(process.env.MONGOURL).then((res) => {
    console.log("MongoDb connected !!!")
}).catch(err => {
    console.log(err)
})

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get("/",(req,res) =>{
    return res.send("hello")
})

job.start()
app.use("/api/user",userRouter)
app.use("/api/classes",classRouter)
app.use("/api/students",studentRouter)
app.use("/api/attendance",attendanceRouter)
app.listen(port,() => {
    console.log(`server is listening => http://localhost:${port}`)
})
