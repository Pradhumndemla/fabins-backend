import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    // let { username, email, password } = req.body
    let { email, name, password } = req.body
    try {
        password = await bcrypt.hash(password, 4)
        // let old = await User.findOne({ $or: [{ username }, { email }] })
        let old = await User.findOne({ email })
        if (old) return res.status(401).send({ error: "invalid details" })
        // const user = await new User({ username, email, password })
        const user = await new User({ email, name, password })
        await user.save();
        let token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY)
        return res.status(200).send({ success: "User Registered", token  });
    } catch (error) {
        return res.status(404).send({ error: `in catch bloack of api ${error} ` });
    }
}
export const login = async (req, res) => {
    // let { username, email, password } = req.body
    let { email, password } = req.body
    try {
        // const user = await User.findOne({ $or: [{ username }, { email }] });
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ error: "user not found " });
        let checkpwd = await bcrypt.compare(password, user.password)
        if (!checkpwd) return res.status(400).send("wrong password");
        let token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY)
        return res.status(200).send({ success: "loged in ", token  })
    } catch (error) {
        return res.status(404).send({ error: `in catch bloack of api ${error} ` });
    }
}