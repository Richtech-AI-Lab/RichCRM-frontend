import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Routing from "./routes/Routing";

import { MsalProvider } from "@azure/msal-react";


const App = ({ pca }) => (
  <>
    <MsalProvider instance={pca}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    <ToastContainer />
    </MsalProvider>
  </>
);

export default App;
