import { useEffect } from "react";
import useUser from "../features/authentication/hooks/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate, isLoading]
  );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
