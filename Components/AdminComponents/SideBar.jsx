import { assets } from "../../Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
    return (
        <div className="flex flex-col bg-slate-100 dark:bg-gray-800 transition-colors duration-300">
            <div className="px-2 sm:pl-14 py-3 border border-gray-300 dark:border-gray-600">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Admin Panel</h2>
            </div>
         <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-gray-300 dark:border-gray-600">
            <div className="w-[50%] sm:w-[80%] absolute right-0 ">
                    <Link href="/admin/addProduct" className="flex items-center border border-gray-400 dark:border-gray-500 gap-3 font-medium px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-[-5px_5px_0px_#6b7280] dark:shadow-[-5px_5px_0px_#374151] hover:shadow-none hover:transform hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                        <Image src={assets.add_icon} width={28} alt="" className="dark:invert" /> <p>Add blogs</p>
                    </Link>
                     <Link href="/admin/blogList" className="mt-5 flex items-center border border-gray-400 dark:border-gray-500 gap-3 font-medium px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-[-5px_5px_0px_#6b7280] dark:shadow-[-5px_5px_0px_#374151] hover:shadow-none hover:transform hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                        <Image src={assets.blog_icon} width={28} alt="" className="dark:invert" /> <p>Lista Tech Flow</p>
                    </Link>
                     <Link href="/admin/subscriptions" className="mt-5 flex items-center border border-gray-400 dark:border-gray-500 gap-3 font-medium px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-[-5px_5px_0px_#6b7280] dark:shadow-[-5px_5px_0px_#374151] hover:shadow-none hover:transform hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                        <Image src={assets.email_icon} width={28} alt="" className="dark:invert" /> <p>Subscriptions</p>
                    </Link>
            </div>
        </div>


        </div>
    );
}

export default SideBar;
