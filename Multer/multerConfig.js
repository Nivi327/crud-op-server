const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: diskStorage
});

module.exports = upload;