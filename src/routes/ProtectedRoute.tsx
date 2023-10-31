// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { RootState } from "../app/store";
import { checkCookies } from "../features/auth/AuthActions";
import { useEffect } from "react";

const ProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      checkCookies(dispatch);
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
