import { assets } from '../../Assets/assets';
import SideBar from '../../Components/AdminComponents/SideBar';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
    // Bloqueia acesso ao admin em produção
    if (process.env.NODE_ENV === 'production') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-400 mb-4">Acesso Negado</h1>
                    <p className="text-gray-300">O painel admin só está disponível em ambiente de desenvolvimento.</p>
                    <a href="/" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Voltar ao Blog
                    </a>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="flex bg-gray-900 min-h-screen transition-colors duration-300">
                <ToastContainer theme={'dark'} />
                <SideBar />
                <div className='flex flex-col w-full'>
                    <div className='flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-gray-700 bg-gray-800'>
                        <h3 className='font-medium text-gray-200'>Admin Panel</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
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
