import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

// ================= SIGNUP =================
export const signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body

        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none", // ✅ FIXED
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        user.password = undefined

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({
            message: "Signup error",
            error: error.message
        })
    }
}

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        let { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ FIXED
            sameSite: "none", // ✅ REQUIRED for Vercel
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        user.password = undefined

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({
            message: "Login error",
            error: error.message
        })
    }
}

// ================= LOGOUT =================
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successfully" })
    } catch (error) {
        return res.status(500).json({
            message: "Logout error",
            error: error.message
        })
    }
}