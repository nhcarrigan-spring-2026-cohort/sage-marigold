const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('images/') ||
      /\.(jpg|jpeg|png|webp)$/i.test(file.originalname)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. please upload an image :('), false);
    }
  },
});
const uploadImages = upload.array('images', 5);
module.exports = { uploadImages };
