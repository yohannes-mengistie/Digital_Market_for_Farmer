const multer = require("multer");
const path = require("path");


// Setuping storage engine
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// initialize multer

const upload = multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
})

module.exports = upload;