const multer = require('multer');
const path = require('path');

const mystorage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const uploads = multer({
    storage: mystorage,
    limits: {
        fileSize: 15 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const fileType = /jpg|jpeg|avif|png|webp/;
        const extname = fileType.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileType.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("Image format not supported"));
        }
    }
})

module.exports = uploads;