import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import { userLoginValidation, userRegisterValidation } from "../middelwares/userValidaton.middelware.js";


const router = Router()

router.route("/register").post(userRegisterValidation,registerUser)
router.route("/login").post(userLoginValidation, loginUser)

export {router}