import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/auth/signup";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route path="*" element={404} />
    </Routes>
  );
};

export default PublicRoute;
