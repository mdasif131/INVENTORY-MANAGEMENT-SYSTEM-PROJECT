import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FullScreenLoader from './components/masterLayout/FullScreenLoader';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SendOTP from './components/users/SendOTP';
import VerifyOTP from './components/users/VerifyOTP';
import CreatePassword from './components/users/CreatePassword';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {/* User Router  */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/send-otp" element={<SendOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/create-password" element={<CreatePassword />} />
        </Routes>
        <FullScreenLoader />
      </BrowserRouter>
    </>
  );
};

export default App;
