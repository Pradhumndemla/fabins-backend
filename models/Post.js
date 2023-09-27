import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    desc: {
        type: String,
        required: true
    },
    img: [{
        destination: String, 
        encoding: String,
        fieldname: String,
        filename: String,
        mimetype: String,
        originalname: String,
        path: String,
        size : Number
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            uid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: String
        }
    ],
}, { timestamps: true })

export default mongoose.model("Post", PostSchema);