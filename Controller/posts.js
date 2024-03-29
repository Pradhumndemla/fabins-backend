import User from '../models/User.js';
import Post from '../models/Post.js';
import logger from "../services/logger.js";


//create a post 
export const addPost = async (req, res) => {
    try {
        // return res.send(JSON.stringify(req));
        let postobj = {};
        postobj.uid = req.user ? req.user._id : req.body.uid;
        if (req.body.desc) postobj.desc = req.body.desc;
        if (req.body.img) postobj.img = [...req.body.img];
        const newPost = new Post(postobj)
        let user = await User.findById(postobj.uid);
        user.posts.push(newPost._id);
        await user.save();
        await newPost.save();
        res.status(200).json({ 
            "success": true,
            "message": "Post created",
            "data": {
                newPost
            } 
        });
    } catch (error) {
        logger.info(error);
        return res.json({ 
            "success": false,
            "message": "Something went wrong" 
        });
    }
}

// update a post 
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.pid);
        if (post.uid === req.user._id) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("updated");
        }
        else {
            res.status(403).json("you can update only your post");
        }
    } catch (error) {
        res.status(404).send({ error: `in catch bloack of api  ${error} `  });

    }
}

// delete a post 
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.pid);
        // if (post.uid === req.user._id) {
            await post.deleteOne();
            res.status(200).json("Deleted");
        // }
        // else {
        //     res.status(403).json("you can delete only your post");
        // }
    } catch (error) {
        res.status(500).json("post not found  " + error);
    }
}


// like a post 
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.pid);
        console.log(post);
        if (!post.likes.includes(req.body._id)) {
            await post.updateOne({ $push: { likes: req.body._id } });
            res.status(200).json("liked")
        }
        else {
            // await post.updateOne({$pull:{likes:req.body.uid}});
            res.status(200).json("already liked")
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// get timeline post  
export const timeline = async (req, res) => {
    try {
        const currentUser = req.user ? await User.findById(req.user._id): await User.findById(req.params.uid);
        const userPosts = await Post.find({ uid: currentUser._id }).populate({ path: 'uid', select: "profilePicture name" }).sort({updateAt:'desc'})        
        let friendsPosts = []
        // await Promise.all(
        //     currentUser.followings.map( async (friendid) => {
        //         // console.log(friendid);
        //         let frndsposts = await Post.find({ uid: friendid }).populate({ path: 'uid', select: "profilePicture username" });
        //         friendsPosts.push(...frndsposts)
        //     })
        // );
        let timeline = [ ...friendsPosts, ...userPosts ]
        timeline.sort(function(a,b){
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        return res.json(timeline);
        // console.log(timeline);
        res.status(200).send({success:`timeline of ${currentUser.username}`,timeline});
    }  catch (error) {
        logger.info(error);
        return res.json({ 
            "success": false,
            "message": "Something went wrong" 
        });
    }
}

// get user all post  
export const profile = async (req, res) => {
    try {
        const userPosts = await Post.find({ uid: req.params.uid }).populate({ path: 'uid', select: "profilePicture username" })
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json("error is " + error);
    }
}

// get a post 

export const viewPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.uid);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
}

