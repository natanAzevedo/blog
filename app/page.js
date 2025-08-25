'use client'
import { ToastContainer } from "react-toastify";
import Header from "../Components/Header";
import BlogList from "../Components/BlogList";
import Footer from "../Components/Footer";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <ToastContainer 
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
