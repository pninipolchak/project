import {hash,compare} from "bcrypt"
import { User, userValidate, userValidateForLogin ,generateToken} from "../mudels/user.js";


export const addUser = async (req, res) => {
    
    let validate = userValidate(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid", message: validate.error.details[0].message });
    let { userName, password, email, role } = req.body;

    try {
        let sameUser = await User.findOne({ $or: [{ userName: userName }, { email: email }] })
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "there is user with such name or email" })
        let hashesPass = await hash(password, 10);
        let newUser = new User({ userName, password:hashesPass,email,role });
        await newUser.save();
        let token = generateToken(newUser)
        let { signUpDate} = newUser;
        return res.json({ token, userName, email, signUpDate })
        
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}

export const login = async (req, res) => {
   
    let validate = userValidateForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid", message: validate.error.details[0].message });

    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user || !await compare(req.body.password, user.password))
            res.status(404).json({ type: "there is no user with this details", message: "please add yourself" })
        let token = generateToken(user)
        let { userName, email, signUpDate, role } = user;
            return res.json({ token,userName,email,signUpDate,role })  
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}, "-password");
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}