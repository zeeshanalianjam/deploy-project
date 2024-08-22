import jwt from "jsonwebtoken"


export const productValidation = (req, res, next)=> {
    // get data from req.headers
    const auth = req.headers['authorization'];

    if (!auth) {
        return res.status(400).json({
            message: "Unauthorized, JWT token is Required!"
        })
    }

    try {
       const decode =  jwt.verify(auth, process.env.JWT_SECRET)
       req.user = decode
       console.log(req.user);
       
       next()
    } catch (error) {
        return res.status(403).json({
            message: "Unauthorized, JWT token is wrong or expired!", error
        })
    }


}