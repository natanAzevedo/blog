'use client'
import { assets } from '@/Assets/assets';
import SideBar from '@/Components/AdminComponents/SideBar';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }) {
    const router = useRouter();

    // Bloqueia acesso em produção - SIMPLES E DIRETO
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/');
        }
    }, [router]);

    // Não renderiza nada em produção
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    
    return (
        <>
            <div className="flex bg-gray-900 min-h-screen transition-colors duration-300">
                <ToastContainer theme={'dark'} />
                <SideBar />
                <div className='flex flex-col w-full'>
                    <div className='flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-gray-700 bg-gray-800'>
                        <h3 className='font-medium text-gray-200'>Admin Panel (LOCAL)</h3>
                        <div className="flex items-center gap-4">
                            <Image src={assets.profile_icon} alt='Profile' width={40} className="rounded-full" />
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
