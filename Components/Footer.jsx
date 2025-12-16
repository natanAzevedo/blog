import React from "react";
import Link from 'next/link'

const Footer = () => {
  return (
   <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-5 md:px-12 lg:px-24">
     <div className="max-w-6xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-center gap-8">
         {/* Logo e Descrição */}
         <div className="flex flex-col items-center md:items-start">
           <div className="flex items-center gap-3 mb-4">
             <Link href="/" className="flex items-center gap-3" aria-label="Ir para a página inicial">
               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                 <span className="text-white font-bold text-lg">TF</span>
               </div>
               <span className="text-2xl font-bold text-white">Tech Flow</span>
             </Link>
           </div>
           <p className="text-gray-400 text-sm max-w-md text-center md:text-left">
             Inspirando através de histórias únicas e conteúdo de qualidade.
           </p>
         </div>

         {/* Links de Navegação */}
         <div className="flex gap-8">
           <div>
             <h4 className="text-white font-semibold mb-3">Links</h4>
             <ul className="space-y-2 text-center md:text-left">
               <li>
                 <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                   Sobre
                 </a>
               </li>
               <li>
                 <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                   Contato
                 </a>
               </li>
               <li>
                 <a href="/support" className="text-gray-400 hover:text-white transition-colors duration-300">
                   Suporte
                 </a>
               </li>
               <li>
                 <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                   Política de Privacidade
                 </a>
               </li>
             </ul>
           </div>
         </div>
       </div>

       {/* Social icons */}
       <div className="flex justify-center gap-4 mt-8">
         <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.55 8.55 0 0 1-2.71 1.04 4.26 4.26 0 0 0-7.26 3.88A12.1 12.1 0 0 1 3.15 4.6a4.26 4.26 0 0 0 1.32 5.69c-.66-.02-1.28-.2-1.82-.49v.05c0 2.04 1.45 3.74 3.37 4.12-.35.1-.73.15-1.12.15-.27 0-.53-.03-.79-.07.53 1.66 2.06 2.87 3.88 2.9A8.55 8.55 0 0 1 2 19.54 12.07 12.07 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 22.46 6z" />
           </svg>
         </a>

         <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 12 14.5 2.5 2.5 0 0 1 12 9.5zM18.5 6a.9.9 0 1 1 0 1.8A.9.9 0 0 1 18.5 6z" />
           </svg>
         </a>

         <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.6c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.15h-1.1c-1.1 0-1.45.69-1.45 1.4V12h2.48l-.4 2.9h-2.08v7A10 10 0 0 0 22 12z" />
           </svg>
         </a>

         <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-300">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 18.5V10H6v8.5h2.5zM7.25 8.75a1.25 1.25 0 1 0 .001-2.501A1.25 1.25 0 0 0 7.25 8.75zM18.5 18.5V13c0-2.48-1.32-3.5-3.07-3.5-1.43 0-2.07.79-2.43 1.35V10H10v8.5h2.5v-4.75c0-1.2.45-2.25 1.75-2.25 1.23 0 1.25 1.18 1.25 2.38V18.5H18.5z" />
           </svg>
         </a>
       </div>

       <div className="border-t border-gray-700 mt-8 pt-8 text-center">
         <p className="text-gray-400 text-sm">
           © 2025 Tech Flow. Todos os direitos reservados.
         </p>
       </div>
     </div>
   </div>
  );
};

export default Footer;
