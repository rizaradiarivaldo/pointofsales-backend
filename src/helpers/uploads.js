const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
  fileFilter(req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg)\b/)) {
      cb(null, true)
    } else {
      cb('Image type must jpg or jpeg', null)
    }
  },
});

module.exports = upload;
