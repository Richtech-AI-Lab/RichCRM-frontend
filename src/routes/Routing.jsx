import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { ForgotPasswordOne, ForgotPasswordThree, ForgotPasswordTwo, Layout, Login, Signup } from "../pages";
import { ROUTES } from "../constants/api";

const Routing = () => {
  useEffect(() => {
    localStorage.setItem("isAuthenticated", true);
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Signup />} />
      <Route path={ROUTES.FORGOT_PASSWORD_ONE} element={<ForgotPasswordOne />} />
      <Route path={ROUTES.FORGOT_PASSWORD_TWO} element={<ForgotPasswordTwo />} />
      <Route path={ROUTES.FORGOT_PASSWORD_THREE} element={<ForgotPasswordThree />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/rich-crm/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default Routing;
