import express from 'express';
import validate from '../middlewares/Validation/bus';
import bus from '../controller/bus';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth.authorize, validate.add, bus.addBus);

export default router;
