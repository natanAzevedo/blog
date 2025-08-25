import { assets, blog_data } from "../Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({title, description, category, image, id}) => {
  return (
   <div className="group max-w-[330px] sm:max-w-[300px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700">
    <Link href={`/blogs/${id}`}>
      <div className="relative overflow-hidden">
        <Image 
          src={image} 
          alt='' 
          width={400} 
          height={400} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
      </div>
    </Link>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded-full">{category}</span>
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
      </div>
      <h5 className="mb-3 text-xl font-bold text-gray-100 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">{title}</h5>
      <p className="mb-4 text-sm text-gray-300 leading-relaxed line-clamp-3"
         dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}>
      </p>

      <Link href={`/blogs/${id}`} className="inline-flex items-center text-blue-400 font-semibold hover:text-indigo-400 transition-colors duration-300 group/link">
        Continue lendo 
        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
   </div>
  );
};

export default BlogItem;
