import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    // followers: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ],
    // followings: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // },
    // desc: String,
    // city: String,
    // from: String,
    // token: String,
    // relationship: {
    //     type: Number,
    //     enum: [1, 2, 3],
    // }
}, { timestamps: true })

export default mongoose.model("User", UserSchema);