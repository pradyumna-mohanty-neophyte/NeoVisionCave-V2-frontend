import React, { useState, useEffect } from "react";
// import { VscGraphLine, VscProject } from "react-icons/vsc";
import { TbScan } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { useLocation } from "react-router-dom";

import {
  MdOutlineContactPage,
  // MdOutlineDocumentScanner,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "../image/logo.jpeg";

export default function SideNav() {
  const [activeNav, setActiveNav] = useState(0);
  let location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setActiveNav(1);
        break;
      case "/volumetric":
        setActiveNav(2);
        break;
      case "/settings":
        setActiveNav(3);
        break;
      default:
        setActiveNav(0);
    }
  }, [activeNav, location.pathname]);
  // console.log("activeNav", activeNav);
  return (
    <>
      <div className="w-2/12 fixed left-0 shadow-md bg-white h-screen  ">
        <div className="flex justify-center">
          <div className="w-4/6">
            {/* <NavLink to={`/dashboard`}> */}
            {/* <img src={Logo} alt="Logo" /> */}
            <button
              type="button"
              onClick={() => window.open("/dashboard", "_self")}
            >
              <img src={Logo} alt="Logo" />
              {/* <img src alt="Logo" /> */}
            </button>
            {/* </NavLink> */}
          </div>
        </div>
        {/* <div className="h-20 flex flex-col justify-center pt-2 text-gray-600">
          <span className="text-3xl self-center font-bold">NEOMETRIC</span>
          <span className="w-7/12 h-2/6 self-center pl-16 text-[10px]">Powered by NEOPHYTE</span>




          <div className="flex justify-center pt-2">
            <img src={Logo} className="w-5/6" alt="Logo" />
          </div>
        </div> */}
        <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="w-11/12 self-end flex flex-col mt-3 py-4 space-y-2  border-b-2 border-white-200">
            <div>
              <NavLink className="cursor-not-allowed">
                {/* <NavLink to={`/dashboard`}> */}
                <p
                  className={`relative flex flex-row items-center h-9 px-2 focus:outline-none dark:hover:bg-gray-300 text-white hover:bg-gray-300 hover:w-96 hover:z-20 hover:rounded-lg focus:bg-blue-500 focus:text-white pr-6 ${
                    activeNav === 1
                      ? "text-white bg-gray-100 rounded-l-lg "
                      : ""
                  }`}
                >
                  <span className="inline-flex justify-center items-center ml-2 ">
                    <MdOutlineSpaceDashboard
                      className={`text-gray-600 font-medium text-lg ${
                        activeNav === 1 ? "text-emerald-500" : ""
                      }`}
                    />
                  </span>
                  <span className="ml-3 text-sm text-md font-sans	font-medium	 text-gray-600 tracking-wide truncate">
                    Dashboard
                  </span>
                </p>
              </NavLink>
            </div>

            <div>
              {/* <NavLink to={`/volumetric`}> */}
              <NavLink className="cursor-not-allowed">
                <p
                  className={`relative flex flex-row items-center h-9 px-2 focus:outline-none dark:hover:bg-gray-300 text-white hover:bg-gray-300 hover:w-96 hover:z-20 hover:rounded-lg focus:bg-blue-500 focus:text-white pr-6 ${
                    activeNav === 2
                      ? "text-white bg-gray-100 rounded-l-lg "
                      : ""
                  }`}
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    <TbScan
                      className={`text-gray-600 font-medium text-lg ${
                        activeNav === 2 ? "text-emerald-500" : ""
                      }`}
                    />
                  </span>
                  <span className="ml-3 text-sm text-md font-sans	font-medium	 text-gray-600 tracking-wide truncate">
                    Volumetric
                  </span>
                </p>
              </NavLink>
            </div>

            <div>
              <NavLink to={`/settings`}>
                <p
                  className={`relative flex flex-row items-center h-9 px-2 focus:outline-none dark:hover:bg-gray-300 text-white hover:bg-gray-300 hover:w-96 hover:z-20 hover:rounded-lg focus:bg-blue-500 focus:text-white pr-6 ${
                    activeNav === 3
                      ? "text-white bg-gray-100 rounded-l-lg "
                      : ""
                  }`}
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    <AiOutlineSetting
                      className={`text-gray-600 font-medium text-lg ${
                        activeNav === 3 ? "text-emerald-500" : ""
                      }`}
                    />
                  </span>
                  <span className="ml-3 text-sm text-md font-sans	font-medium	 text-gray-600 tracking-wide truncate">
                    Settings
                  </span>
                </p>
              </NavLink>
            </div>

            {/* <div>
           
                <p className="relative flex flex-row  items-center h-9 px-6 focus:outline-none dark:hover:bg-gray-300 text-white hover:bg-purple-200 hover:w-96 hover:z-20  dark:hover:border-gray-800 focus:bg-blue-500 focus:text-white pr-6 ">
                  <span className="inline-flex justify-center items-center ml-2">
                    <BiStore className="text-purple-800 font-medium text-md" />
                  </span>
                  <span className="ml-3 text-sm text-md font-sans	font-medium	 text-gray-600 tracking-wide truncate">
                    Store
                  </span>
                </p>
            
            </div> */}

            {/* <div>
              
                <p className="relative flex flex-row   items-center h-9 px-6 focus:outline-none dark:hover:bg-gray-300 text-white hover:bg-purple-200 hover:w-96 hover:z-20  dark:hover:border-gray-800 focus:bg-blue-500 focus:text-white pr-6 ">
                  <span className="inline-flex justify-center items-center ml-2">
                    <BiUser className="text-purple-800 font-medium	 text-md" />
                  </span>
                  <span className="ml-3 text-sm text-md font-sans	font-medium	 text-gray-600 tracking-wide truncate">
                    User
                  </span>
                </p>
          
            </div> */}
          </div>
          <div className="mb-5 flex flex-col">
            <div className="w-11/12 self-end flex flex-col py-4 space-y-2">
              <p className="relative flex flex-row items-center cursor-not-allowed h-9 px-2 focus:outline-none  dark:hover:bg-gray-300 hover:bg-purple-200  text-white hover:text-white  border-transparent dark:hover:border-gray-800 focus:bg-blue-500 hover:rounded-l-lg focus:text-white pr-6">
                <span className="inline-flex justify-center items-center ml-2">
                  <CgFileDocument className="text-gray-600 font-medium text-lg" />
                </span>
                <span className="ml-3 text-gray-600 font-sans text-sm	font-medium	 tracking-wide truncate">
                  Documentation
                </span>
              </p>
            </div>
            <div className="w-11/12 self-end flex flex-col space-y-2">
              <a
                href="https://neophyte.live/contact"
                target="_blank"
                rel="noreferrer"
              >
                <p className="relative flex flex-row items-center  h-9 px-2 focus:outline-none  dark:hover:bg-gray-300 hover:bg-purple-200  text-white hover:text-white  border-transparent  dark:hover:border-gray-800 hover:rounded-l-lg focus:bg-blue-500 focus:text-white pr-6">
                  <span className="inline-flex justify-center items-center ml-2">
                    <MdOutlineContactPage className="text-gray-600 font-medium text-lg" />
                  </span>
                  <span className="ml-3 text-sm text-md font-sans	font-medium	 text-gray-600 tracking-wide truncate">
                    Contact Us
                  </span>
                </p>
              </a>
            </div>
          </div>
          <hr />

          <div className="w-full absolute bottom-0">
            <div className="pt-5">
              <div className="">
                <p className="mt-auto relative flex flex-row items-center focus:outline-none hover:bg-purple-200  font-sans dark:hover:bg-gray-300 text-gray-700   border-transparent  dark:hover:border-gray-800 focus:bg-blue-500 focus:text-white pr-6">
                  <span className="ml-5 text-sm  text-md	font-medium	 tracking-wide truncate">
                    Vers. Info 0.02 Beta
                  </span>
                </p>
              </div>

              <div className="px-5 w-full mt-3">
                <div className="border-t border-gray-400 text-xs py-2 text-gray-700">
                  <p>copyright © 2023 NeoPhyte.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
