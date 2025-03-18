import { React, useState, useEffect } from "react";
// import SideNav from "../others/sidenav";
import Video from "./video";
import DetectedResult from "./detectedResult";
// import SingleResult from "./singleResult";
import Controller from "./controller";
// import demoImage from "../image/demoimage.jpg";
// import { MdClass } from "react-icons/md";
// import { FaCube } from "react-icons/fa";
// import { FaRulerHorizontal } from "react-icons/fa";
// import { TbLineHeight } from "react-icons/tb";
// import { CgDisplayFullwidth } from "react-icons/cg";

export default function Volumetric() {
  const [extend, setExtend] = useState();
  const [startCamera, setStartCamera] = useState(null);

  const handleExtendsValue = (newValue) => {
    // Do something with the new value in the parent component
    // console.log("Received value from child:", newValue);
    setExtend(newValue);
  };
  // console.log("FullScreenValue", extend);

  const videoStart = async () => {
    // console.log("child call me");

    setStartCamera("http://192.168.1.25:9990/camera/preview");
  };
  useEffect(() => {
    // console.log("startCamera", startCamera);
  }, [startCamera]);

  return (
    <>
      <div
        // className="w-full h-full flex bg-gray-100 "
        className={`w-full h-full flex ${
          !extend ? "bg-gray-100" : "bg-[#000]"
        }`}
      >
        {/* <div className={`${!extend ? "" : "hidden"}`}>
          <SideNav />
        </div> */}
        {/* <div
          //  className="w-2/12 h-screen"
          className={`${!extend ? "w-2/12 h-screen" : "hidden"}`}
        ></div> */}
        <div
          //  className="w-10/12 h-screen p-4 flex flex-row space-x-4"
          className={`h-screen p-2 flex flex-row space-x-3 ${
            !extend ? "w-10/12" : "w-full"
          }`}
        >
          <div className="w-[640px] h-full flex flex-col justify-center space-y-3.5">
            <div
              // className="w-full h-3/4"
              className={` ${
                !extend ? "w-full h-[360px]" : "w-[640px] h-[360px]"
              }`}
            >
              <Video
                videoStream={startCamera}
                extendValue={handleExtendsValue}
              />
            </div>
            <div
              // className="flex-grow"
              className={`${!extend ? "flex-grow" : "hidden"}`}
            >
              <Controller onClick={videoStart} />
            </div>
          </div>
          <div className="flex-grow flex flex-col lg:space-y-3 2xl:space-y-4">
            {/* <DetectedResult /> */}
            <div
              // className="w-full h-[70%]"
              className={`${!extend ? "h-full" : "h-full"}`}
            >
              <DetectedResult />
            </div>
            {/* <div
              // className="flex-grow"
              className={`${!extend ? "flex-grow" : "hidden"}`}
            >
              <SingleResult />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
