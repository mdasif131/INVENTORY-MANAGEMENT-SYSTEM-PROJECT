import exress from 'express';
import { login, profileDetails, profileUpdate, recoverResetPass, recoverVerifyEmail, recoverVerifyOTP, registration } from '../controllers/Users/userController';
import { authenticate } from '../middlewares/authVerify';
import { brandDropDown, brandList, createBrand, deleteBrand, updateBrand } from '../controllers/Brands/brandController';
import { categoryDropDown, categoryList, createCategory, deleteCategory, updateCategory } from '../controllers/Categories/categoriesController';
import { createCustomer, customerDropDown, CustomerList, deleteCustomer, updateCustomer } from '../controllers/Customers/customersController';
import { createSupplier, deleteSupplier, supplierDropDown, supplierList, updateSupplier } from '../controllers/Suppliers/suppliersController';
import { createExpensetypes, deleteExpenseType, ExpensetypesDropDown, expensetypesList, updateExpensetypes } from '../controllers/Expenses/expensesTypeController';
import { createExpense, deleteExpense, expensesList, updateExpense } from '../controllers/Expenses/expensesController';
import { createProduct, deleteProduct, productList, updateProduct } from '../controllers/Products/productsController';
import { createPurchases, purchaseDelete, purchasesList } from '../controllers/Purchases/purchasesController';
import { createSales, salesDelete, SalesList } from '../controllers/Sells/salesController';
import { createReturn, returnDelete, returnList } from '../controllers/Returns/returnsControllers';
import { expenseReportService } from '../services/report/expenseReportService';
import { purchasesReportService } from '../services/report/purchasesReportService';
import { returnReportService } from '../services/report/returnReportService';
import { salesReportService } from '../services/report/salesReportService';
import { expenseSummaryService } from '../services/summary/expenseSummaryService';
import { purchaseSummaryService } from '../services/summary/purchaseSummaryService';
import { returnSummaryService } from '../services/summary/returnSummaryService';
import { salesSummaryService } from '../services/summary/salesSummaryService';
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
router.put("/update-brand/:id", authenticate, updateBrand)
router.get("/brand-list/:pageNo/:perPage/:searchKeyword", authenticate, brandList)
router.get("/brandDropDown", authenticate, brandDropDown) 
router.delete('/delete-brand/:id', authenticate, deleteBrand);

// Categories 
router.post("/create-category", authenticate, createCategory)
router.put('/update-category/:id', authenticate, updateCategory);
router.get("/category-list/:pageNo/:perPage/:searchKeyword", authenticate, categoryList)
router.get('/categoryDropDown', authenticate, categoryDropDown);
router.delete('/delete-category/:id', authenticate, deleteCategory);

// Customers 
router.post("/create-customer", authenticate, createCustomer)
router.put('/update-customer/:id', authenticate, updateCustomer);
router.get("/customer-list/:pageNo/:perPage/:searchKeyword", authenticate, CustomerList)
router.get('/customerDropDown', authenticate, customerDropDown);
router.delete('/delete-customer/:id', authenticate, deleteCustomer);

// Suppliers 
router.post("/create-supplier", authenticate, createSupplier)
router.put('/update-supplier/:id', authenticate, updateSupplier);
router.get("/supplier-list/:pageNo/:perPage/:searchKeyword", authenticate, supplierList)
router.get('/supplierDropDown', authenticate, supplierDropDown);
router.delete('/delete-supplier/:id', authenticate, deleteSupplier);

// Expense Types 
router.post('/create-expensetypes', authenticate, createExpensetypes);
router.put('/update-expensetypes/:id', authenticate, updateExpensetypes);
router.get("/expensetypes-list/:pageNo/:perPage/:searchKeyword", authenticate, expensetypesList)
router.get('/expensetypesDropDown', authenticate, ExpensetypesDropDown);
router.delete('/delete-expense-type/:id', authenticate, deleteExpenseType);

// Expenses
router.post('/create-expenses', authenticate, createExpense);
router.put('/update-expenses/:id', authenticate, updateExpense);
router.get("/expenses-list/:pageNo/:perPage/:searchKeyword", authenticate, expensesList)
router.delete('/delete-expense/:id', authenticate, deleteExpense);


// Products
router.post('/create-product', authenticate, createProduct);
router.put('/update-product/:id', authenticate, updateProduct);
router.get("/product-list/:pageNo/:perPage/:searchKeyword", authenticate, productList)
router.delete('/delete-product/:id', authenticate, deleteProduct);

// Purchases
router.post('/create-purchases', authenticate, createPurchases);
router.get("/purchases-list/:pageNo/:perPage/:searchKeyword", authenticate, purchasesList)
router.delete('/delete-purchases/:id', authenticate, purchaseDelete);

// Sales
router.post('/create-sales', authenticate, createSales);
router.get("/sales-list/:pageNo/:perPage/:searchKeyword", authenticate, SalesList)
router.delete('/delete-sales/:id', authenticate, salesDelete);

// Return
router.post('/create-return', authenticate, createReturn);
router.get("/return-list/:pageNo/:perPage/:searchKeyword", authenticate, returnList)
router.delete('/delete-return/:id', authenticate, returnDelete);

// Report
router.post('/expenses-by-date', authenticate, expenseReportService)
router.post('/purchases-by-date', authenticate, purchasesReportService);
router.post('/return-by-date', authenticate, returnReportService);
router.post('/sales-by-date', authenticate, salesReportService);

// Summary
router.get('/expenses-summary', authenticate, expenseSummaryService)
router.get('/purchases-summary', authenticate, purchaseSummaryService);
router.get('/return-summary', authenticate, returnSummaryService);
router.get('/sales-summary', authenticate, salesSummaryService);


export default router;