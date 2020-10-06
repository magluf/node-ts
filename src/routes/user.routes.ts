import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.route('/').post(UserController.createUser);

export default router;
