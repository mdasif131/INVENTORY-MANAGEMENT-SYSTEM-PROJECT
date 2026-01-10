import exress from 'express';
import { login, profileDetails, profileUpdate, recoverResetPass, recoverVerifyEmail, recoverVerifyOTP, registration } from '../controllers/Users/userController';
import { authenticate } from '../middlewares/authVerify';
import { brandDropDown, brandList, createBrand, updateBrand } from '../controllers/Brands/brandController';
import { categoryDropDown, categoryList, createCategory, updateCategory } from '../controllers/Categories/categoriesController';
import { createCustomer, customerDropDown, CustomerList, updateCustomer } from '../controllers/Customers/customersController';
import { createSupplier, supplierDropDown, supplierList, updateSupplier } from '../controllers/Suppliers/suppliersController';
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

// Categories 
router.post("/create-category", authenticate, createCategory)
router.post('/update-category/:id', authenticate, updateCategory);
router.get("/category-list/:pageNo/:perPage/:searchKeyword", authenticate, categoryList)
router.get('/categoryDropDown', authenticate, categoryDropDown);

// Customers 
router.post("/create-customer", authenticate, createCustomer)
router.post('/update-customer/:id', authenticate, updateCustomer);
router.get("/customer-list/:pageNo/:perPage/:searchKeyword", authenticate, CustomerList)
router.get('/customerDropDown', authenticate, customerDropDown);

// Suppliers 
router.post("/create-supplier", authenticate, createSupplier)
router.post('/update-supplier/:id', authenticate, updateSupplier);
router.get("/supplier-list/:pageNo/:perPage/:searchKeyword", authenticate, supplierList)
router.get('/supplierDropDown', authenticate, supplierDropDown);

export default router;