import React from "react";

const Header = () => {

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-5 md:px-12 lg:px-24">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-white">Blog</span>
          </div>
       
        </div>
    <div className="text-center my-12">
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
        Descubra Projetos que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Inspiram</span>
      </h1>
      <p className="mt-6 max-w-2xl m-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
        Explore artigos únicos sobre tecnologia, desenvolvimento pessoal e inovação. Conteúdo criado para expandir seus horizontes e transformar sua perspectiva.
      </p>
    </div>

    </div>
  );
};

export default Header;
