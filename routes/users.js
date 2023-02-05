import express from 'express';
import { deleteUser, followUser, unfollowUser, updateUser, viewUser } from '../Controller/users.js';
// import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

// router.use(checkLogin)

// view specific User
router.get('', viewUser)

// view specific User
router.get('/:input', viewUser);

//update User
router.patch('/:id', updateUser)

// delete User
router.delete('/:id', deleteUser)

// follow User
router.post('/follow/:id', followUser);

// unfollow User
router.post('/unfollow/:id', unfollowUser);

router.get('*', (req, res) => {
    res.status(404).send("Page Not Found");
});
export default router;