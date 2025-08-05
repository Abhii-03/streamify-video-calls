import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async(req , res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorised - No token provided"})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decode){
            return res.status(401).json({message:"Unauthorised - Invalid token"})
        }

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            res.status(401).json({message:"Inauthorised - User not found"})
        }

        req.user = user;
        next()
    } catch (error) {
        console.log("Error in protectRoute Middleware", error)
        res.status(500).json({message: "Internal server error"})
    }
}