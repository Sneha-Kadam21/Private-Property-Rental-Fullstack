import express from 'express'
import {signUp} from "../controllers/auth.controller.js"
import {login} from "../controllers/auth.controller.js"
import {logOut} from "../controllers/auth.controller.js"


const authRouter=express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logOut)

export default authRouter;