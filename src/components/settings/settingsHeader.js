import React from "react";
// import UserMenu from "../usermenu/userMenu";
// import ExportData from "../dashboard/exportData/exportData";
// import { IoMdNotifications } from "react-icons/io";

export default function SettingsHeader() {
  return (
    <>
      <div className="w-10/12 bg-white flex justify-between px-5">
        <div className="w-1/4 h-full lg:text-xl 2xl:text-2xl font-sans text-gray-600 font-bold tracking-wide">
          Settings
        </div>
        {/* <div className="flex flex-row space-x-7">
          <SearchBar date={date} />
          <div className="h-full flex flex-row space-x-4 justify-end">
            <ExportData />
            <div className="text-3xl text-gray-500">
              <IoMdNotifications />
            </div>
            <UserMenu />
          </div>
        </div> */}
      </div>
    </>
  );
}
