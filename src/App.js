import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <BrowserRouter>
      <PublicRoute />
    </BrowserRouter>
    <ToastContainer />
  </>
);

export default App;
