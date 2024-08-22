import Joi from "joi"
import { apiError } from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js"

// user signup validation
const userRegisterValidation = (req, res, next) => {
    // user signup or register set the validation with the help Joi library
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    // get error from req.body to be help of schema.validate method
    const {error} = schema.validate(req.body);

    // check user validate ok or not
    if(error){
        return res.status(400).json(
            new apiResponse(400,error, "Bad Reqeust from the user validation!")
        )
    }

    next()

}


// user login validation
const userLoginValidation = (req, res, next) => {
    // user signup or register set the validation with the help Joi library
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    // get error from req.body to be help of schema.validate method
    const {error} = schema.validate(req.body);

    // check user validate ok or not
    if(error){
        return res.status(400).json(
            new apiResponse(400,error, "Bad Reqeust from the user validation!")
        )
    }

    next()

}



export { userRegisterValidation, userLoginValidation}