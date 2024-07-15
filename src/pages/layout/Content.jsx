import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard";
import Cases from "../cases";

const Content = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cases" element={<Cases />} />

      <Route path="/*" element={404} />
    </Routes>
  );
};

export default Content;
