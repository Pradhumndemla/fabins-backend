import express from 'express';
import multer from 'multer'


const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "../api/public/assets/post/")
    },
    filename:(req, file, cb)=>{
        cb(null, `${file.fieldname}_${Date.now()}.${file.originalname.split(".").reverse()[0]}`) 
    }
})

const upload = multer({storage})
router.post("/upload", upload.single("file"), (req, res)=>{
    try {
        res.status(200).json(req.file)
    } catch (error) {
        console.log(error);
    }
})


export default router;