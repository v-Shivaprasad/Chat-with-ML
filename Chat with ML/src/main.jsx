import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "./store/ThemeManage.jsx";
// import { CompCommunicateProvider } from "./store/CompCommunicater.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <CompCommunicateProvider> */}
        <App />
      {/* </CompCommunicateProvider> */}
    </ThemeProvider>
  </React.StrictMode>
);
