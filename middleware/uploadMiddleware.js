import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g$|png$|webp$/;
  const mimetypes = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetypes && extname) {
    return cb(null, true);
  }
  cb(new Error('Images only (jpg, jpeg, png, webp)!'));
};

const upload = multer({ storage, fileFilter });

export default upload;