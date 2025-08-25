import { assets } from '@/Assets/assets';
import SideBar from '@/components/AdminComponents/SideBar';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
    return (
     <>
     <div className="flex">
        <ToastContainer theme='dark' />
        <SideBar />
        <div className='flex flex-col w-full'>
            <div className='flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black'>
            <h3 className='font-medium'>Admin Panel</h3>
            <Image src={assets.profile_icon} alt='Profile' width={40}  />
            </div>
            {children}
        </div>
     </div>
 
     </>
    );
}
