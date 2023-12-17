import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { RootState } from "../app/store";
import { checkCookies } from "../features/auth/AuthActions";
import React, { useEffect } from "react";

const ProtectedRoute: React.FC = () => {

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.user.isAuthenticated
  );

  const isLogout = useAppSelector((state:RootState) => state.auth.isLogout)
    
  useEffect(() => {
    if (!isAuthenticated && isLogout) {
      checkCookies(dispatch);
    }
  }, [isAuthenticated, dispatch, isLogout]);

  return isAuthenticated ? <Outlet/> : <Navigate to="/home" />;
};

export default ProtectedRoute;
