import exress from 'express';
import { login, profileDetails, profileUpdate, recoverResetPass, recoverVerifyEmail, recoverVerifyOTP, registration } from '../controllers/userController';
import { authenticate } from '../middlewares/authVerify';
import { brandDropDown, brandList, createBrand, updateBrand } from '../controllers/brandController';
const router = exress.Router(); 

// User Routes 
router.post("/registration", registration)
router.post("/login", login) 
router.put('/profile-update',  authenticate, profileUpdate);

router.get("/profile-details", authenticate, profileDetails)
router.get("/recover-verify-email/:email", authenticate, recoverVerifyEmail)
router.get("/recover-verify-otp/:email/:otp", authenticate, recoverVerifyOTP)
router.post("/recover-reset-password", authenticate, recoverResetPass) 

// Brands 
router.post("/create-brand", authenticate, createBrand)
router.post("/update-brand/:id", authenticate, updateBrand)
router.get("/brand-list/:pageNo/:perPage/:searchKeyword", authenticate, brandList)
router.get("/brandDropDown", authenticate, brandDropDown)

export default router;