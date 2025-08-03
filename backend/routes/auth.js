import express from "express"
import userCtrl from "../controllers/usercontroller.js"
import { 
  validateRegister, 
  validateLogin, 
  validateForgotPassword, 
  validateResetPassword,
  handleValidationErrors 
} from "../middleware/validation.js"

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, userCtrl.register);

router.post('/login', validateLogin, handleValidationErrors, userCtrl.login);

router.post('/forgot-password', validateForgotPassword, handleValidationErrors, userCtrl.forgotPassword);

router.post('/reset-password', validateResetPassword, handleValidationErrors, userCtrl.resetPassword);

router.get('/debug/users', userCtrl.debugUsers);

router.post('/debug/delete-user', userCtrl.debugDeleteUser);

export default router; 