import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import configureDB from "./db/db.js"
import todoRoutes from "./routes/todos.js"
import aiRoutes from "./routes/ai.js"
import authRoutes from "./routes/auth.js"

dotenv.config()
configureDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)

app.use("/api/todos", todoRoutes)

app.use("/api/ai", aiRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})
