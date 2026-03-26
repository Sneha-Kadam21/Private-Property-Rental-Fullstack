import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import path from "path"

dotenv.config()

const app = express()

// ✅ MIDDLEWARE
app.use(express.json())
app.use(cookieParser())

// ✅ CORS (IMPORTANT FOR DEPLOYMENT)
app.use(cors({
  origin: [
    "http://localhost:5173",            // local
    "https://private-property-rental-fullstack-1.vercel.app"       // 🔥 replace after deploy
  ],
  credentials: true
}))

// ✅ STATIC FOLDER (for uploaded files if needed)
app.use("/uploads", express.static(path.resolve("uploads")))

// ✅ ROUTES
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)

// ✅ CONNECT DB FIRST
connectDb()

// ✅ START SERVER
const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})