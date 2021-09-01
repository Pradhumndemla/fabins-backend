import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

const checkLogin = async (req, res, next)=>{
    try {
        const { authorization } = req.headers;
        if (!authorization) {
          return res.status(401).json({ error: "you must be logged in" });
        }
        let token = authorization.replace("Bearer ", "");
        let {_id} = jwt.verify(token, process.env.JWT_KEY);  
        const user = await User.findById({_id}).select("-password");
        if (!user){
            return res.status(401).json({ error: "user not found" });   
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "invalid token"});             
    }
}
export default checkLogin ;
