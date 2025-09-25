import React from "react";
import Image from "next/image";
import { assets } from "../../Assets/assets";
import Link from "next/link";

const BlogTableItem = ({authorImg, title, author, date, deleteBlog, mongoId}) => {
    const BlogDate = new Date(date);
    
    return (
        <tr className="bg-white border-b">
           <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{author ? author.charAt(0).toUpperCase() : "A"}</span>
            </div>
           <p>{author?author:"no author"}</p>
           </th>
           <td className="px-6 py-4">
                {title?title:"no title"}
           </td>
            <td className="px-6 py-4">
                {BlogDate.toLocaleDateString()}
           </td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <Link href={`/admin/editBlog?id=${mongoId}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                            Editar
                        </button>
                    </Link>
                    <button 
                        onClick={() => deleteBlog(mongoId)} 
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                    >
                        Deletar
                    </button>
                </div>
           </td>
        </tr>
    );
};

export default BlogTableItem;
