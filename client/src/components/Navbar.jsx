import React from "react";
import {logo} from '../data.js'
const Navbar = () => {
  return (
    <div className="bg-[#343A40] p-6 flex justify-between items-center border-b-2 border-[#495057]">
      <div className="flex items-center gap-2">
        <h1 id="logo">&lt;/&gt;</h1>
        <h1 className="text-[20px]">ProFile</h1>
      </div>
      <div className="flex items-center gap-4">
        <button id="theme" className="w-[28px] flex item-center"><img src={logo.light} className="w-full h-full" alt="" /></button>
        <button className="bg-[#fff]  rounded-[50%]  w-[2.5rem] h-[2.5rem]"></button>
        <button className="w-[28px] flex item-center"><img src={logo.exit} className="w-full h-full" alt="" /></button>
      </div>
    </div>
  );
};

export default Navbar;
