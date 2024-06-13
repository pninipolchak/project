
import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


let userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    signUpDate:{ type: Date, default: Date.now() },
    role: { type: String, default: "USER" }

})

export const User = mongoose.model("users", userSchema)



export const userValidateForLogin = (_user) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6}$/).required(),
    });

    return schema.validate(_user);
}



export const userValidate = (_user) => {

    const schema = Joi.object({
        userName: Joi.string().min(1).max(30).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6}$/).required(),
        email: Joi.string().email().required(),
        role:Joi.string()
    });

    return schema.validate(_user);
}



export const generateToken = (user) => {
    let jwtSecretKey = process.env.JWT_SECRET||"ILoveKnowNode"
    let data = {
        userName: user.userName,
        _id: user._id,
        role: user.role
    }

    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: '30m',
    });

    return token;
}