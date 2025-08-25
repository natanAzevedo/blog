'use client'
import { assets, blog_data } from "../../../Assets/assets.js";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../Components/Footer";
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
        <div className="flex justify-center items-center min-h-screen">
            <p>Carregando...</p>
        </div>
    ) : error ? (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500">{error}</p>
        </div>
    ) : data ? <>

    <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
            <Link href="/">
                <span className="text-xl font-bold">Blog</span>
            </Link>
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                Get started <Image src={assets.arrow} alt='' width={20} height={20} />
                </button>
        </div>
    <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
        <Image className="mx-auto mt-6 border border-white rounded-full" src={data.authorImg || assets.profile_icon}  width={60} height={60} alt='' />
        <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
    </div>
    </div>
    <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image className="border-4 border-white"  src={data.image}  width={1280} height={720} alt='' />

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.description }} />

            <div className="my-24">
                <p className="text-black font-semibold my-4">Share this article on social media</p>
                <div className="flex">
                   <Image src={assets.facebook_icon} width={50} alt='Facebook' />
                   <Image src={assets.twitter_icon} width={50} alt='Twitter' />
                   <Image src={assets.googleplus_icon} width={50} alt='LinkedIn' />
                </div>
            </div>
    </div>
    <Footer />
    </> : (
        <div className="flex justify-center items-center min-h-screen">
            <p>Nenhum dado encontrado</p>
        </div>
    );
};

export default page;
