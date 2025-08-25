'use client'
import { ToastContainer } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";

const ThemedToastContainer = () => {
  
  return (
    <ToastContainer 
      theme={'dark'} 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />
  );
};

export default ThemedToastContainer;
