import React from "react";
import Image from "next/image";
import { assets } from "../Assets/assets";

const Footer = () => {
  return (
   <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
   <p className="text-sm text-white ">All rights reserved. </p>
   <div className="flex">
    <Image src={assets.facebook_icon} alt="Facebook" width={40}/>
    <Image src={assets.twitter_icon} alt="Twitter" width={40}/>
    <Image src={assets.googleplus_icon} alt="Instagram" width={40}/>
   </div>
   </div>
  );
};

export default Footer;
