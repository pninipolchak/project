import express from "express";
import { addUser,getAllUsers,login} from '../controllers/user.js';
import { authAdmin } from "../middelwares/authorized.js";


const userRouter = express.Router();

userRouter.post('/', addUser);

userRouter.post('/login', login);

userRouter.get('/',authAdmin, getAllUsers)

export default userRouter;