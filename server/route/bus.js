import express from 'express';
import validate from '../middlewares/Validation/bus';
import bus from '../controller/bus';
import auth from '../middlewares/auth';
import upload from '../utils/multer';

const router = express.Router();

  router.post('/', auth.authorize, auth.checkAdmin, upload.single('image'),
  validate.year, validate.company, validate.physicalProps, bus.addBus);

export default router;
