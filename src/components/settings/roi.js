import { React, useState } from "react";
import { BiReset } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
import IMG from "../image/D18.jpg";

import { Rnd } from "react-rnd";
import Rectangle from "./rectangleComp";
export default function Roi() {
  const [isOpen, setIsOpen] = useState(false);

  const handleRoiOpen = () => {
    setIsOpen(true);
  };

  const handleRoiClose = () => {
    setIsOpen(false);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleDrag = (e, { x, y }) => setPosition({ x, y });
  const handleResize = (e, direction, ref, delta, position) => {
    setSize({ width: ref.style.width, height: ref.style.height });
  };

  const minPosX = position.x;
  const maxPosX = position.x + parseInt(size.width);
  const minPosY = position.y;
  const maxPosY = position.y + parseInt(size.height);
  console.log("position", position);
  console.log("size", size);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
          <div className="w-[60%] flex flex-col space-y-4 ">
            {isOpen === true ? (
              <>
                <div className="w-full relative">
                  {/* <img src={IMG} alt="" /> */}
                  <Rectangle src={IMG} />
                </div>
              </>
            ) : (
              <img src={IMG} alt="set roi" className="blur-sm" />
              // <Rectangle imageUrl="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg" />
            )}
            <div className="w-full flex justify-center">
              {isOpen === true ? (
                <div className="p-[10px] flex space-x-2">
                  <button
                    id="poppinsFont"
                    type="button"
                    className="px-4 py-1.5 rounded-md shadow-md text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-700"
                  >
                    <div className="flex flex-row self-center space-x-2">
                      <MdOutlineDownloadDone className="self-center text-2xl" />
                      <span>Set</span>
                    </div>
                  </button>
                  <button
                    id="poppinsFont"
                    onClick={handleRoiClose}
                    type="button"
                    className="px-4 py-1.5 rounded-md shadow-md text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-800"
                  >
                    <div className="flex flex-row self-center space-x-2">
                      <ImCross className="self-center text-sm" />
                      <span className="">Cancel</span>
                    </div>
                  </button>
                </div>
              ) : (
                <button onClick={handleRoiOpen}>
                  <span id="rubikFont" class="box">
                    Set ROI
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <div className="w-full py-2 flex flex-row space-x-3">
                <div className="px-6 self-center flex flex-row">
                  <span id="jakartaFont" className="self-center text-base">
                    X (Min, Max) :
                  </span>
                  {/* <AiOutlineInfoCircle className="self-center mx-2"/> */}
                </div>
                <div className="self-center flex flex-row space-x-4">
                  <div className="flex flex-col">
                    <span
                      id="jakartaFont"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Min
                    </span>
                    <input
                      className="w-32 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      type="number"
                      name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      // value={mailId}
                      // onChange={(e) => setMailId(e.target.value)}
                    />
                    {/* <span id="jakartaFont" className="text-xs">
                  cm
                </span> */}
                  </div>
                  <div className="flex flex-col">
                    <span
                      id="jakartaFont"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Max
                    </span>
                    <input
                      className="w-32 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      type="number"
                      name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      // value={mailId}
                      // onChange={(e) => setMailId(e.target.value)}
                    />
                    {/* <span id="jakartaFont" className="text-xs">
                  cm
                </span> */}
                  </div>
                </div>
              </div>
              <div className="w-full py-2 flex flex-row space-x-3">
                <div className="px-6 self-center flex flex-row">
                  <span id="jakartaFont" className="self-center text-base">
                    Y (Min, Max) :
                  </span>
                  {/* <AiOutlineInfoCircle className="self-center mx-2"/> */}
                </div>
                <div className="self-center flex flex-row space-x-4">
                  <div className="flex flex-col">
                    <span
                      id="jakartaFont"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Min
                    </span>
                    <input
                      className="w-32 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      type="number"
                      name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      // value={mailId}
                      // onChange={(e) => setMailId(e.target.value)}
                    />
                    {/* <span id="jakartaFont" className="text-xs">
                  cm
                </span> */}
                  </div>
                  <div className="flex flex-col">
                    <span
                      id="jakartaFont"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Max
                    </span>
                    <input
                      className="w-32 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      type="number"
                      name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      // value={mailId}
                      // onChange={(e) => setMailId(e.target.value)}
                    />
                    {/* <span id="jakartaFont" className="text-xs">
                  cm
                </span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full py-2 px-6 flex space-x-3 justify-end">
              <button
                id="poppinsFont"
                type="button"
                className="px-4 py-1.5 rounded-md shadow-md text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-700"
              >
                <div className="flex flex-row self-center space-x-2">
                  <BiReset className="self-center text-lg" />
                  <span>Reset</span>
                </div>
              </button>
              <button
                id="poppinsFont"
                type="submit"
                className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
