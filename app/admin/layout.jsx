import { assets } from '../../Assets/assets';
import SideBar from '../../Components/AdminComponents/SideBar';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
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
