'use client'
import { assets, blog_data } from "../../../Assets/assets.js";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../Components/Footer";
import ThemeToggle from "../../../Components/ThemeToggle";
import axios from "axios";

const page = ({params}) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

   
    const unwrappedParams = React.use(params);

    const fetchBlogData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/blog', {
                params: { id: unwrappedParams.id }
            });
            
       
            if (response.data.blog) {
                setData(response.data.blog);
            } else {
                setError('Blog não encontrado');
            }
        } catch (err) {
            console.error('Erro ao buscar blog:', err);
            setError('Erro ao carregar blog');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (unwrappedParams?.id) {
            fetchBlogData();
        }
    }, [unwrappedParams?.id]);

    return loading ? (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <p className="text-gray-800 dark:text-gray-200">Carregando...</p>
            </div>
        </div>
    ) : error ? (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
            <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
    ) : data ? <>

    <div className="bg-gray-200 dark:bg-gray-800 py-5 px-5 md:px-12 lg:px-28 transition-colors duration-300">
        <div className="flex justify-between items-center">
            <Link href="/">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Blog</span>
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-gray-800 dark:border-gray-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] hover:transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                    Começar Leitura <Image src={assets.arrow} alt='' width={20} height={20} className="dark:invert" />
                </button>
            </div>
        </div>
    <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-gray-800 dark:text-gray-100">{data.title}</h1>
        <Image className="mx-auto mt-6 border border-white dark:border-gray-600 rounded-full" src={data.authorImg || assets.profile_icon}  width={60} height={60} alt='' />
        <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto text-gray-600 dark:text-gray-300">{data.author}</p>
    </div>
    </div>
    <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10 bg-white dark:bg-gray-900 transition-colors duration-300">
            <Image className="border-4 border-white dark:border-gray-700 rounded-lg"  src={data.image}  width={1280} height={720} alt='' />

            <div className="blog-content px-6" dangerouslySetInnerHTML={{ __html: data.description }} />

            <div className="my-24 px-6">
                <p className="text-gray-800 dark:text-gray-200 font-semibold my-4">Compartilhe este artigo nas redes sociais</p>
                <div className="flex gap-2">
                   <Image src={assets.facebook_icon} width={50} alt='Facebook' className="hover:scale-110 transition-transform cursor-pointer" />
                   <Image src={assets.twitter_icon} width={50} alt='Twitter' className="hover:scale-110 transition-transform cursor-pointer" />
                   <Image src={assets.googleplus_icon} width={50} alt='LinkedIn' className="hover:scale-110 transition-transform cursor-pointer" />
                </div>
            </div>
    </div>
    <Footer />
    </> : (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
            <p className="text-gray-800 dark:text-gray-200">Nenhum dado encontrado</p>
        </div>
    );
};

export default page;
