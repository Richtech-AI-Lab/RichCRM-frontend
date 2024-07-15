import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../pages/layout/Layout";
import Login from "../pages/auth/login";
import { useEffect } from "react";

const Routing = () => {
  useEffect(() => {
    localStorage.setItem("isAuthenticated", true);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/rich-crm/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default Routing;
