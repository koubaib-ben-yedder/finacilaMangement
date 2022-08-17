const multer = require("multer");
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"images");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        req.file=file
        console.log("1",file)
        cb(null,  fileName)
    }
});

exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    }
});