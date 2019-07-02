import express from 'express';
import validate from '../middlewares/Validation/auth';
import auth from '../controller/auth';
// import auth from '../../middleware/auth';

const router = express.Router();

router.post('/signup', validate.validateSignUp, auth.signup);
router.post('/login', validate.validateLogin, auth.login);

export default router;
