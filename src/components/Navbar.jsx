import React, { useState, useEffect } from "react";
import logo from "./image/neo-icr.png";
import { io } from "socket.io-client";

// const sock = io("http://localhost:5000"); // Update with your backend URL

function Navbar() {
  

  return (
    <div className="flex items-center justify-between py-0 px-8 shadow-xl">
      {/* Logo & Temperature Container */}
      <div className="flex items-center space-x-4">
        {/* Neophyte Logo */}
        <img src={logo} alt="Neophyte Logo" className="h-16 w-auto" />

        
      </div>

      {/* Title */}
      {/* <div className="text-2xl md:text-4xl">Neometry</div> */}
    </div>
  );
}

export default Navbar;
