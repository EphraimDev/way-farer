import express from 'express';
import validate from '../middlewares/Validation/auth';
import auth from '../controller/auth';
import authorization from '../middlewares/auth';
import upload from '../utils/multer';


const router = express.Router();

router.post('/signup', upload.single('image'), validate.validateSignUp,  auth.signup);
router.post('/login', validate.validateLogin, auth.login);
router.patch('/:userId', authorization.authorize, upload.single('image'),  auth.updateProfile);

export default router;
