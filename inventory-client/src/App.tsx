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
            <Route path="/category-list" element={<CategoryListPage />} />
            <Route path="/customer-list" element={<CustomerListPage />} />
            <Route path="/expense-list" element={<ExpenseListPage />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/return-list" element={<ReturnListPage />} />
            <Route path="/sales-list" element={<SalesListPage />} />
            <Route path="/supplier-list" element={<SupplierListPage />} />
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
