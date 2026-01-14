import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FullScreenLoader from './components/masterLayout/FullScreenLoader';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SendOTP from './components/users/SendOTP';
import VerifyOTP from './components/users/VerifyOTP';
import CreatePassword from './components/users/CreatePassword';
import Page404 from './pages/Page404';
import PrivateRoute from './components/PrivateRoutes';
import ProfilePage from './pages/ProfilePage';
import DashBoardPage from './pages/DashboardPage';
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
            <Route path="/dashboard" element={<DashBoardPage />} />
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
