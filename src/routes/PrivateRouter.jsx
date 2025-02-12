import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

PrivateRouter.propTypes = {
  children: PropTypes.element,
};

export default PrivateRouter;