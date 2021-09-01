import express from 'express';
import { addPost, deletePost, likePost, profile, timeline, updatePost, viewPost } from '../Controller/posts.js';
import checkLogin from '../middleware/checkLogin.js'
const router = express.Router();

// router.use(checkLogin)

//create a post 
router.post("/", addPost)

// update a post 
router.post("/:pid", updatePost)

// delete a post 
router.delete("/:pid", deletePost)

// like a post 
router.put("/like/:pid", likePost)

// get timeline post  
router.get('/timeline/:uid', timeline)

// get user all post  
router.get('/profile/:username', profile)

// get a post 
router.get("/view/:uid", viewPost)


export default router;