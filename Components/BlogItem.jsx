import { assets } from "../Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({title, description, category, image, id, date, author}) => {
  // Função para calcular tempo de leitura estimado
  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const readTime = calculateReadTime(description);

  return (
   <div className="group max-w-[380px] sm:max-w-[350px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700">
    <Link href={`/blogs/${id}`}>
      <div className="relative overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={240} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
        
        {/* Badge de categoria flutuante */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>
    </Link>
    
    <div className="p-6">
      {/* Meta informações */}
      <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{author ? author.charAt(0).toUpperCase() : "A"}</span>
            </div>
            <span>{author || "Autor"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span>{date ? formatDate(date) : "Recente"}</span>
          <span>•</span>
          <span>{readTime} min</span>
        </div>
      </div>

      <h5 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
        {title}
      </h5>
      
      <p className="mb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 whitespace-pre-wrap">
        {description.slice(0, 140)}...
      </p>

      <div className="flex items-center justify-between">
        <Link href={`/blogs/${id}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group/link">
          Ler artigo
          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        
        {/* Indicador de popularidade/qualidade removido */}
      </div>
    </div>
   </div>
  );
};

export default BlogItem;
