import express from 'express';
import validate from '../middlewares/Validation/auth';
import auth from '../controller/auth';
import authorization from '../middlewares/auth';
import upload from '../utils/multer';


const router = express.Router();

router.post('/signup', upload.single('image'), validate.validateNames, validate.validateEmail, validate.validatePassword, auth.signup);
router.post('/signin', validate.validateEmail, validate.validatePassword, auth.login);
router.patch('/:user_id', authorization.authorize, upload.single('image'), auth.updateProfile);
router.get('/all', auth.allUsers);

export default router;
