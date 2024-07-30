import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { ForgotPasswordOne, ForgotPasswordThree, ForgotPasswordTwo, Layout, Login, Signup } from "../pages";

const Routing = () => {
  useEffect(() => {
    localStorage.setItem("isAuthenticated", true);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgot-password-one" element={<ForgotPasswordOne />} />
      <Route path="/forgot-password-two" element={<ForgotPasswordTwo />} />
      <Route path="/forgot-password-three" element={<ForgotPasswordThree />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/rich-crm/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default Routing;
