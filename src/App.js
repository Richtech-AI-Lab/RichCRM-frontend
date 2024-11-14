import { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Routing from "./routes/Routing";

import { MsalProvider } from "@azure/msal-react";
import { LangchainContext } from "./pages/dashboard/langchainContext";


const App = ({ pca }) => {
  const [openaiAPIKey, setOpenaiAPIKey] = useState(process.env.REACT_APP_CHATGPT_KEY);
  
return (
  <>
    <LangchainContext.Provider value={{ openaiAPIKey: openaiAPIKey, setOpenaiAPIKey: setOpenaiAPIKey }}>
    <MsalProvider instance={pca}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    <ToastContainer />
    </MsalProvider>
    </LangchainContext.Provider>
  </>
);
}

export default App;
