import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {

  const [email, setEmail] = React.useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-5 md:px-12 lg:px-24">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-white">Blog</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 font-medium">
                Começar Leitura
            </button>
          </div>
        </div>
    <div className="text-center my-12">
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
        Descubra Histórias que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Inspiram</span>
      </h1>
      <p className="mt-6 max-w-2xl m-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
        Explore artigos únicos sobre tecnologia, desenvolvimento pessoal e inovação. Conteúdo criado para expandir seus horizontes e transformar sua perspectiva.
      </p>
    <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-12" action="">
      <div className="flex rounded-full bg-gray-800 shadow-lg border-2 border-gray-700 overflow-hidden">
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          placeholder="Seu melhor email" 
          className="flex-1 px-6 py-4 outline-none text-gray-200 bg-transparent placeholder-gray-500" 
        />
        <button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium"
        >
          Inscrever-se
        </button>
      </div>
    </form>
    </div>

    </div>
  );
};

export default Header;
