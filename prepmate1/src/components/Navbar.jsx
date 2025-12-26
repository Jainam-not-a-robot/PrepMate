import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex gap-8 items-center">
        <Link to = "/" className="text-indigo-400 font-bold text-xl">
        Prepmate
  
        </Link>
       <Link to ="/upload"  className="text-gray-300 hover:text-indigo-400">
       
       Upload Files
       </Link>



      </div>






    </nav>
  );
};

export default Navbar;
