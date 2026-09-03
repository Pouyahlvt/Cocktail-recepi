"use client";

import { LogIn, Martini } from "lucide-react";
import Search_bar from "./searchbar";

const Navbar = () => {
  return (
    <div className="w-full mx-auto flex fixed top-5 h-fit z-30">
      <div className="flex rounded-full backdrop-blur-lg px-5">
        {<Martini className="ml-5 my-auto" color="white" size={40} />}
        <h1 className="ml-5 text-4xl font-megrim font-bold  text-bright-snow my-auto">
          {"C - Recpie"}
        </h1>
      </div>
      <Search_bar />
      <button
        className="w-15 h-15 bg-bright-snow/70 backdrop-blur-lg rounded-full mr-5 flex items-center cursor-pointer hover:w-25 
      transition-all duration-300 ease-in-out hover:bg-bright-snow/90">
        {<LogIn size={30} className="mx-auto " />}
      </button>
    </div>
  );
};

export default Navbar;
