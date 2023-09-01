import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from "../services/logger.js";

export const register = async (req, res) => {
    try {
        logger.info(JSON.stringify(req.body));
        let { email, name, password } = req.body;
        password = await bcrypt.hash(password, 4);
        let old = await User.findOne({ email });

        if (old) return res.json({ 
            "success": false,
            "message": "Invalid email or password" 
        });

        const user = await new User({ email, name, password });
        await user.save();
        
        let token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        return res.json({ 
            "success": true,
            "message": "Registration successfully",
            "data": {
                token
            } 
        });
    } catch (error) {
        logger.info(JSON.stringify(error));
        return res.json({ 
            "success": false,
            "message": "Something went wrong" 
        });
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        logger.info(JSON.stringify(req.body));

        const user = await User.findOne({ email });
        if (!user) return res.json({
            "success": false,
            "message": "Invalid Credentials",
        });
        
        let checkpwd = await bcrypt.compare(password, user.password)
        if (!checkpwd) return res.json({
            "success": false,
            "message": "Invalid Credentials"    
        });
        
        let token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        return res.json({ 
            "success": true,
            "message": "logged in successfully",
            "data": {
                token
            }  
        });
    
    } catch (error) {
        logger.info(JSON.stringify(error));
        return res.json({ 
            "success": false,
            "message": "Invalid Credentials"
         });
    }
}