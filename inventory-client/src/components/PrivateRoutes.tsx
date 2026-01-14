import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../helper/sessionHelper';

const PrivateRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
