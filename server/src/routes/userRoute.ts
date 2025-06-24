import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '@controllers/userHandler';
import { hasRole } from '@/middlewares/authentication';

const userRouter = Router();

// Administrative operations
// These routes are only accessible by admin users
userRouter.get('/', hasRole('admin'), getAllUsers);
userRouter.delete('/:id', hasRole('admin'), deleteUserById);

// User level operations
userRouter.get('/:id', hasRole(), getUserById);
userRouter.put('/:id', hasRole(), updateUserById);

export default userRouter;
