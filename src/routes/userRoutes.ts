import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.get('/users', authMiddleware, adminMiddleware, userController.listUsers);
router.patch('/users/:userId/status', authMiddleware, adminMiddleware, userController.updateUserStatus);
router.delete('/users/:userId', authMiddleware, adminMiddleware, userController.deleteUser);
router.get('/users/details/:userId', authMiddleware, adminMiddleware, userController.getUserDetails);
router.patch('/users/details/:userId', authMiddleware, userController.updateUserDetails);
router.delete('/users/pekerjaan/:userId/:pekerjaanId', authMiddleware, userController.deleteUserPekerjaan);
router.delete('/users/pendidikan/:userId/:pendidikanId', authMiddleware, userController.deleteUserPendidikan);
router.delete('/users/pelatihan/:userId/:pelatihanId', authMiddleware, userController.deleteUserPelatihan);

router.post('/users/details', authMiddleware, userController.createUserDetails);
router.get('/users/details', authMiddleware, userController.getUserDetails);
router.patch('/users/details', authMiddleware, userController.updateUserDetails);
router.delete('/users/pekerjaan/:pekerjaanId', authMiddleware, userController.deleteUserPekerjaan);
router.delete('/users/pendidikan/:pendidikanId', authMiddleware, userController.deleteUserPendidikan);
router.delete('/users/pelatihan/:pelatihanId', authMiddleware, userController.deleteUserPelatihan);

export default router;
