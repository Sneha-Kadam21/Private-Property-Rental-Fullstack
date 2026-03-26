import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        // ❌ No token
        if (!token) {
            return res.status(401).json({ message: "User does not have a token" })
        }

        // ❌ Invalid token
        let verifyToken
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" })
        }

        // ✅ Attach userId
        req.userId = verifyToken.userId

        next()

    } catch (error) {
        return res.status(500).json({ message: `isAuth error: ${error.message}` })
    }
}

export default isAuth