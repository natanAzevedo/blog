'use client'
import { assets } from "../../../Assets/assets.js";
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

    {/* Hero Section com imagem de fundo */}
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
            <Image 
                src={data.image} 
                alt={data.title}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* Navegação no topo */}
        <div className="absolute top-0 left-0 right-0 z-10 py-5 px-5 md:px-12 lg:px-28">
            <Link href="/" className="inline-flex items-center text-white hover:text-blue-300 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar ao Blog
            </Link>
        </div>
        
        {/* Conteúdo do Hero */}
        <div className="relative z-10 text-center px-5 md:px-12 lg:px-28 max-w-4xl">
            <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-600/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
                    {data.category}
                </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                {data.title}
            </h1>
            
            {/* Meta informações */}
            <div className="flex items-center justify-center gap-6 text-white/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{data.author ? data.author.charAt(0).toUpperCase() : "A"}</span>
                    </div>
                    <span>{data.author}</span>
                </div>
                
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{data.date ? new Date(data.date).toLocaleDateString('pt-BR') : "Publicado recentemente"}</span>
                </div>
                
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{Math.ceil(data.description.split(' ').length / 200)} min de leitura</span>
                </div>
            </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
    </div>

    {/* Conteúdo do artigo */}
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-8 py-16">
            {/* Conteúdo principal */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <div className="blog-content text-gray-800 dark:text-gray-100 leading-relaxed whitespace-pre-wrap break-words text-lg">
                    {data.description}
                </div>
            </article>

            {/* Seção de compartilhamento melhorada */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                            Gostou do artigo?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Compartilhe com seus amigos e ajude a espalhar conhecimento!
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-end gap-3">
                        <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-w-[140px]">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="font-semibold text-center">Facebook</span>
                        </button>
                        
                        <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-w-[140px]">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            <span className="font-semibold text-center">Twitter</span>
                        </button>
                        
                        <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-w-[140px]">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <span className="font-semibold text-center">Instagram</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Call to action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Quer mais conteúdo como este?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Explore mais artigos e descubra histórias inspiradoras que vão transformar sua perspectiva.
                </p>
                <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                    Ver Mais Artigos
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
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
