import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./routes/Routing";

const App = () => (
  <>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    <ToastContainer />
  </>
);

export default App;
