import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/User.js';
const router = express.Router();

//update User
export const updateUser = async (req, res) => {
    if (req.body.uid === req.params.id) {
        try {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 4);
            }
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })

            res.status(200).json("Account has been updated")
        } catch (error) {

        }
    }
    else {
        res.status(403).json("You can update only your account")
    }
}
export const deleteUser = async (req, res) => {
    if (req.body.uid === req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            res.status(404).json("deletion operation failed error " + error)
        }
    }
    else {
        res.status(403).json("You can delete only your account")
    }
}

export const viewUser = async (req, res) => {
    const { input } = req.params
    try {
        if (!input) {
            const users = await User.find().select({ "password": 0, "createdAt": 0, "updatedAt": 0, "__v": 0 });
            if (users) return res.status(200).send(users)
        }
        const user = await User.findOne({ username:input }).select({ "password": 0, "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (user) return res.status(200).send(user);
        return res.status(200).send("user not found");

    } catch (error) {
        res.status(500).send(error);
    }
}

export const followUser = async (req, res) => {
    if (req.body.uid !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.uid);
            if (!user.followers.includes(req.body.uid)) {
                await user.updateOne({ $push: { followers: req.body.uid } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been follow")
            } else {
                res.status(403).json("u already follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json(err);
    }
}

export const unfollowUser = async (req, res) => {
    if (req.body.uid !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.uid);
            if (!user.followers.includes(req.body.uid)) {
                await user.updateOne({ $pull: { followers: req.body.uid } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollow")
            } else {
                res.status(403).json("u already unfollow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json(err);
    }
}
