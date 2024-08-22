import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user register
export const registerUser = asyncHandler(async (req, res) => {
  try {
    // get the user details
    const { name, email, password } = req.body;

    // find the user
    const user = await User.findOne({ email });

    //    check the user is already exist or not
    if (user) {
      return res
        .status(409)
        .json(
          new apiResponse(
            409,
            user,
            "User is already exist | Now you can login!"
          )
        );
    }

    // prepare the new model
    const userModel = new User({ name, email, password });

    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10); // yeh line apka password hash kar ke string return karegi
    userModel.password = hashedPassword; // ab aap is string ko mongoose model mein set kar sakte hain

    // save the data in database
    const userData = await userModel.save();

    //  final response
    return res
      .status(201)
      .json(new apiResponse(201, userData, "User register successfully..."));
  } catch (error) {
    //   catch part
    console.error("Error: ", error); // Yeh line error ko console karegi
    res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
});

// user login
export const loginUser = asyncHandler(async (req, res) => {
  try {
    // get the user details
    const {email, password } = req.body;

    // find the user
    const user = await User.findOne({ email });

    //    check the user is already exist or not
    if (!user) {
      return res
        .status(403)
        .json(new apiResponse(403, user, "User does not exist!"));
    }

    // campare the user password and db password is equal or not
    const passwordIsEqual = await bcrypt.compare(password, user.password);

    if (!passwordIsEqual) {
      return res
        .status(403)
        .json(new apiResponse(403, user, "User password or email incorrect!"));
    }

    // jwt token
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_SECRET_EXPIRY,
      }
    );

    //  final response
    return res
      .status(201)
      .json({
        message: "User login sucessfully...",
        success: true,
        jwtToken,
        email,
        name : user.name
    });
  } catch (error) {
    //   catch part
    console.error("Error: ", error); // Yeh line error ko console karegi
    res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
});
