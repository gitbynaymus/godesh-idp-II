import { Navigate, useLocation } from "react-router";
import Loading from "../components/shared/Loading";
import { useUser } from "../hooks/useUser";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { data:user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <Loading/>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default RoleBasedRoute;
