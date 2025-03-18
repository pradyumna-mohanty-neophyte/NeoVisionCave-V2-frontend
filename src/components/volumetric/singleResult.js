import React, { useEffect, useState } from "react";

// import { MdClass } from "react-icons/md";
import { BiBarcodeReader } from "react-icons/bi";
import { FaCube } from "react-icons/fa";
import { FaRulerHorizontal } from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { CgDisplayFullwidth } from "react-icons/cg";
import { FaWeightHanging } from "react-icons/fa";
import io from "socket.io-client";

export default function SingleResult() {
  const [chat, setChat] = useState([]);

  const [lbhData, setLbhData] = useState(false);
  const [cloneLbh, setCloneLbh] = useState([]);

  useEffect(() => {
    const socket = io("http://192.168.1.25:9990", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });

    socket.emit("message", "wss");

    socket.on("get_results", (data) => {
      setLbhData(data);
      setCloneLbh(data.data);
      setChat((oldChats) => [data.data, ...oldChats]);
    });
  }, []);

  const copyofCloneArray = [...cloneLbh];

  var allData = [];
  allData.unshift(copyofCloneArray);

  return (
    <>
      <div className="w-full h-full flex flex-row space-x-2">
        <div className="w-full h-full p-1 bg-white rounded-md shadow-md flex flex-col lg:space-y-2 2xl:space-y-4">
          <div className="w-full h-2/6 flex flex-col rounded-md shadow-md bg-rose-600 ">
            <div className="flex flex-row space-x-1">
              <span className="text-xl ml-1 self-center text-white">
                <BiBarcodeReader />
              </span>
              <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                EAN
              </span>
            </div>
            <div className="flex-grow h-full px-1 flex justify-end">
              {lbhData && (
                <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                  {lbhData.data[4]}
                </span>
              )}
            </div>
          </div>

          <div className="w-full h-2/6 flex flex-col rounded-md shadow-md bg-teal-600 ">
            <div className="flex flex-row space-x-1">
              <span className="text-lg ml-1 self-center text-white">
                <FaCube />
              </span>
              <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                Volume
              </span>
            </div>
            <div className="flex-grow h-full px-1 flex justify-end">
              {lbhData && (
                <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                  {(
                    lbhData.data[0] *
                    lbhData.data[1] *
                    lbhData.data[2]
                  ).toFixed(2)}{" "}
                  mm<sup>3</sup>
                </span>
              )}
            </div>
          </div>

          <div className="w-full h-2/6 flex flex-col rounded-md shadow-md bg-sky-600 ">
            <div className="flex flex-row space-x-1">
              <span className="text-lg ml-1 self-center text-white">
                <FaWeightHanging />
              </span>
              <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                Weight
              </span>
            </div>
            <div className="flex-grow h-full px-1 flex justify-end">
              {lbhData && (
                <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                  {lbhData.data[3].toFixed(2)} g
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-full p-1 bg-white rounded-md shadow-md flex flex-col lg:space-y-2 2xl:space-y-4">
          <div className="w-full h-2/6 flex flex-col rounded-md shadow-md bg-amber-600 ">
            <div className="flex flex-row space-x-1">
              <span className="text-lg ml-1 self-center text-white">
                <FaRulerHorizontal />
              </span>
              <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                Length
              </span>
            </div>
            <div className="flex-grow h-full px-1 flex justify-end">
              {lbhData && (
                <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                  {lbhData.data[0].toFixed(2)} mm
                </span>
              )}
            </div>
          </div>

          <div className="w-full h-2/6 flex flex-col rounded-md shadow-md bg-indigo-600 ">
            <div className="flex flex-row space-x-1">
              <span className="text-lg ml-1 self-center text-white">
                <CgDisplayFullwidth />
              </span>
              <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                Width
              </span>
            </div>
            <div className="flex-grow h-full px-1 flex justify-end">
              {lbhData && (
                <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                  {lbhData.data[1].toFixed(2)} mm
                </span>
              )}
            </div>
          </div>

          <div className="w-full h-2/6 flex flex-col rounded-md shadow-md bg-gray-600 ">
            <div className="flex flex-row space-x-1">
              <span className="text-lg ml-1 self-center text-white">
                <TbLineHeight />
              </span>
              <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                Height
              </span>
            </div>
            <div className="flex-grow h-full px-1 flex justify-end">
              {lbhData && (
                <span className="self-center font-semibold lg:text-md 2xl:text-xl text-white">
                  {lbhData.data[2].toFixed(2)} mm
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
