import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, user }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
  return <div></div>;
}

export default ProtectedRoutes;
