import React from "react";
import Image from "next/image";
import { assets } from "../../Assets/assets";

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
            <td onClick={() => deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
              x
           </td>
        </tr>
    );
};

export default BlogTableItem;
