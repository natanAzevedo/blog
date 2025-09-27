import React from "react";

const Footer = () => {
  return (
   <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-5 md:px-12 lg:px-24">
     <div className="max-w-6xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-center gap-8">
         {/* Logo e Descrição */}
         <div className="flex flex-col items-center md:items-start">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
               <span className="text-white font-bold text-lg">B</span>
             </div>
             <span className="text-2xl font-bold text-white">Blog</span>
           </div>
           <p className="text-gray-400 text-sm max-w-md text-center md:text-left">
             Inspirando através de histórias únicas e conteúdo de qualidade.
           </p>
         </div>

         {/* Links de Navegação */}
         <div className="flex gap-8">
           <div>
             <h4 className="text-white font-semibold mb-3">Contato</h4>
             <ul className="space-y-2">
               <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Sobre</a></li>
               <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contato</a></li>
             </ul>
           </div>
         </div>
       </div>
       
       <div className="border-t border-gray-700 mt-8 pt-8 text-center">
         <p className="text-gray-400 text-sm">
           © 2025 Blog. Todos os direitos reservados.
         </p>
       </div>
     </div>
   </div>
  );
};

export default Footer;
