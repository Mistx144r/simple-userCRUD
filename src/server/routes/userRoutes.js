import express from 'express';
import * as userController from '../controllers/userController.js';
import { userAuth } from '../middlewares/userAuth.js';

const router = express.Router();

router.get('/', userAuth, userController.getAllUsers);
router.get('/:id', userAuth, userController.getUserById);

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

router.put('/:id', userAuth, userController.updateUser);
router.delete('/:id', userAuth, userController.deleteUser);

export default router;