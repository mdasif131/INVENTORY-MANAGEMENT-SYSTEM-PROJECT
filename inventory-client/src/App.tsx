import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FullScreenLoader from './components/masterLayout/FullScreenLoader';
import PrivateRoute from './components/PrivateRoutes';
import CreatePassword from './components/users/CreatePassword';
import SendOTP from './components/users/SendOTP';
import VerifyOTP from './components/users/VerifyOTP';
import BrandListPage from './pages/BrandPage/BrandListPage';
import CategoryListPage from './pages/CategoryPage/CategoryPage';
import DashBoardPage from './pages/DashboardPage/DashboardPage';
import Page404 from './pages/Page404';
import LoginPage from './pages/UserPage/LoginPage';
import ProfilePage from './pages/UserPage/ProfilePage';
import RegistrationPage from './pages/UserPage/RegistrationPage';
import CustomerListPage from './pages/CustomerPage/CustomerListPage';
import ExpenseListPage from './pages/ExpensesPage/ExpenseListPage';
import ProductListPage from './pages/ProductPage/ProductListPage';
import ReturnListPage from './pages/ReturnPage/ReturnListPage';
import SalesListPage from './pages/SalesPage/SalesListPage';
import SupplierListPage from './pages/SupplierPage/SupplierListPage';
import ExpenseTypeListPage from './pages/ExpensesPage/ExpenseTypeListPage';
import PurchaseListPage from './pages/PurchasePage/PurchaseListPage';
import SupplierCreateUpdatePage from './pages/SupplierPage/SupplierCreateUpdatePage';
import BrandCreateUpdaePage from './pages/BrandPage/BrandCreateUpdatePage';
import CategoryCreateUpdatePage from './pages/CategoryPage/CategoryCreateUpdatePage';
import ExpenseCreateUpdatePage from './pages/ExpensesPage/ExpenseCreateUpdatePage';
import SalesCreateUpdatePage from './pages/SalesPage/SalesCreateUpdatePage';
import ReturnCreateUpdatePage from './pages/ReturnPage/ReturnCreateUpdatePage';
import PurchaseCreateUpdatePage from './pages/PurchasePage/PurchaseCreateUpdatePage';
import ProductCreateUpdatePage from './pages/ProductPage/ProductCreateUpdatePage';
import ExpenseTypeCreateUpdatePage from './pages/ExpensesPage/ExpenseTypeCreateUpdatePage';
import CustomerCreateUpdatePage from './pages/CustomerPage/CustomerCreateUpdatePage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Publice routes  */}
          {/* User Router  */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/send-otp" element={<SendOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/create-password" element={<CreatePassword />} />

          {/* Protected Routes  */}
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<DashBoardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/brand-list" element={<BrandListPage />} />
            <Route path="/brand-create-update" element={<BrandCreateUpdaePage />} />
            <Route path="/category-list" element={<CategoryListPage />} />
            <Route path="/category-create-update" element={<CategoryCreateUpdatePage />} />
            <Route path="/customer-list" element={<CustomerListPage />} />
            <Route path="/customer-create-update" element={<CustomerCreateUpdatePage />} />
            <Route path="/expensetype-list" element={<ExpenseTypeListPage />} />
            <Route path="/expensetype-create-update" element={<ExpenseTypeCreateUpdatePage />} />
            <Route path="/expense-list" element={<ExpenseListPage />} />
            <Route path="/expense-create-update" element={<ExpenseCreateUpdatePage />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/product-create-update" element={<ProductCreateUpdatePage />} />
            <Route path="/purchase-list" element={<PurchaseListPage />} />
            <Route path="/purchase-create-update" element={<PurchaseCreateUpdatePage />} />
            <Route path="/retrun-list" element={<ReturnListPage />} />
            <Route path="/retrun-create-update" element={<ReturnCreateUpdatePage />} />
            <Route path="/sales-list" element={<SalesListPage />} />
            <Route path="/sales-create-update" element={<SalesCreateUpdatePage />} />
            <Route path="/supplier-list" element={<SupplierListPage />} />
            <Route path="/supplier-create-update" element={<SupplierCreateUpdatePage />}/>
          </Route>

          {/* Catch-all 404 - MOVED TO THE END */}
          <Route path="*" element={<Page404 />} />
        </Routes>
        <FullScreenLoader />
      </BrowserRouter>
    </>
  );
};

export default App;
