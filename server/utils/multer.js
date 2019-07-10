import multer from 'multer';

const storage = multer.diskStorage({
    filename(_req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  const imageFilter = (_req, file, cb) => {
    // accept image files in jpg/jpeg/png only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    return cb(null, true);
  };

  const upload = multer({ storage, fileFilter: imageFilter });

  export default upload;