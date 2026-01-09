import exress from 'express';
import { login, profileDetails, profileUpdate, recoverResetPass, recoverVerifyEmail, recoverVerifyOTP, registration } from '../controllers/userController';
import { authenticate } from '../middlewares/authVerify';
const router = exress.Router(); 

// User Routes 
router.post("/registration", registration)
router.post("/login", login) 
router.put('/profile-update',  authenticate, profileUpdate);

router.get("/profile-details", authenticate, profileDetails)
router.get("/recover-verify-email/:email", authenticate, recoverVerifyEmail)
router.get("/recover-verify-otp/:email/:otp", authenticate, recoverVerifyOTP)
router.post("/recover-reset-password", authenticate, recoverResetPass)

export default router;