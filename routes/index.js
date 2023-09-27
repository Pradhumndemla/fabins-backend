import express from 'express';
import multer from 'multer';
import path from "path";


const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./upload/");
    },
    filename:(req, file, cb)=>{
        cb(null, `${file.fieldname}_${Date.now()}.${file.originalname.split(".").reverse()[0]}`); 
    }
});
const upload = multer({storage});

router.post("/upload", upload.array("files"), (req, res)=>{
    try {
        res.status(200).json({
            "success": true,
            "message": "Upload successfully",
            "data": [...req.files]
            });
    } catch (error) {
        res.status(200).json({ 
            "success": false,
            "message": "Invalid file" 
        })
        console.log(error);
    }
});

router.get('/upload/:path', function (req, res) {
    try {

        const options = {
            root: path.join(process.cwd()+'/upload/')
        };
        const fileName = req.params.path;
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', fileName);
            }
        });
        // res.send('success');
    } catch (error) {
        res.send('Error'+error);
    }
});
    

export default router;