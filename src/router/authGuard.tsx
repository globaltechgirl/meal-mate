import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { type RootState } from "@/store/store";
import { ROUTES } from "@/utils/constants";

const AuthGuard = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} replace />;
};

export default AuthGuard;