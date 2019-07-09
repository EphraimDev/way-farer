import express from 'express';
import multer from 'multer';
import validate from '../middlewares/Validation/auth';
import auth from '../controller/auth';
// import auth from '../../middleware/auth';

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

const router = express.Router();

router.post('/signup', upload.single('image'), validate.validateSignUp,  auth.signup);
router.post('/login', validate.validateLogin, auth.login);

export default router;
