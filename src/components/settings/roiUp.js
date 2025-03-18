import { React, useState, useEffect } from "react";
import { BiReset } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
// import IMG from "../image/RoiImage.jpg";
import { Rnd } from "react-rnd";
import Box from "@mui/material/Box";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  SET_CURRENT_ROI,
  GET_CURRENT_ROI,
  // GET_DEFAULT_ROI,
  RESET_TO_DEFAULT_ROI,
  GET_ROI_IMG,
} from "../authservice/api";
import toast, { Toaster } from "react-hot-toast";
// import box from "../image/test_op.jpeg"

export default function RoiUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [roiCord, setRoiCord] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // const [reset, setReset] = useState(false);
  const handleRoiOpen = () => {
    setIsOpen(true);
  };

  const handleRoiClose = () => {
    setIsOpen(false);
  };

  const [prePosition, setPrePosition] = useState({ x: 0, y: 0 });
  const [preSize, setPreSize] = useState({ width: 300, height: 200 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 300, height: 200 });

  useEffect(() => {
    async function getStores() {
      try {
        const data = await GET_CURRENT_ROI();
        // console.log(data.data);
        console.log(" get Curent env Data", data);
        if (data) {
          setPosition({
            x: data.data[0].data.roi_min[0],
            y: data.data[0].data.roi_min[1],
          });
          setPrePosition({
            x: data.data[0].data.roi_min[0],
            y: data.data[0].data.roi_min[1],
          });
          setSize({
            width: data.data[0].data.roi_max[0] - data.data[0].data.roi_min[0],
            height: data.data[0].data.roi_max[1] - data.data[0].data.roi_min[1],
          });
          setPreSize({
            width: data.data[0].data.roi_max[0] - data.data[0].data.roi_min[0],
            height: data.data[0].data.roi_max[1] - data.data[0].data.roi_min[1],
          });
          // setMinX(data.data[0].data.roi_min[0])
          // setMinY(data.data[0].data.roi_min[1])
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStores();
  }, []);

  useEffect(() => {
    fetch("http://192.168.30.33:9990/settings/get_roi_image") // Replace with your API endpoint URL
      .then((response) => response.blob()) // Get the response as a Blob
      .then((blob) => {
        const url = URL.createObjectURL(blob); // Create a temporary URL for the image
        // setImageData(imageUrl);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  console.log("img url", imageUrl);

  const handleDrag = (e, { x, y }) => setPosition({ x, y });
  const handleResize = (e, direction, ref, delta, position) => {
    setPosition(position);
    setSize({ width: ref.style.width, height: ref.style.height });
  };
  // const handleImageChange = (event) => {
  //   const imgElement = event.target;
  //   const rect = imgElement.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   // console.log("Image coordinates:", x, y);
  // };
  // console.log("size", size)

  const minPosX = position.x.toFixed(0);
  const minPosY = position.y.toFixed(0);
  const maxPosX = (position.x + parseInt(size.width)).toFixed(0);
  const maxPosY = (position.y + parseInt(size.height)).toFixed(0);
  // console.log("position", position);
  // console.log("size", size);

  const [minX, setMinX] = useState(minPosX);
  const [minY, setMinY] = useState(minPosY);
  const [maxX, setMaxX] = useState(maxPosX);
  const [maxY, setMaxY] = useState(maxPosY);

  useEffect(() => {
    setMinX(minPosX);
    setMinY(minPosY);
    setMaxX(maxPosX);
    setMaxY(maxPosY);
  }, [minPosX, minPosY, maxPosX, maxPosY]);

  useEffect(() => {
    setRoiCord([minX, minY, maxX, maxY]);
  }, [minX, minY, maxX, maxY]);

  const handleAnnotationSubmit = async () => {
    // toast.loading("Setting new ROI");
    try {
      const roiData = {
        roi_min: [roiCord[0], roiCord[1]],
        roi_max: [roiCord[2], roiCord[3]],
      };
      const data = await SET_CURRENT_ROI(roiData);
      if (data) {
        console.log("SuccessFully ");
        toast.success("New ROI set successfully");
      } else {
        toast.error("Error setting new ROI");
      }
    } catch (error) {
      console.log("error ", error);
    }

    console.log("RoiCord", roiCord);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = async () => {
    try {
      const data = await RESET_TO_DEFAULT_ROI();
      if (data) {
        if (data) {
          setMinX(data.data.roi_min[0]);
          setMinY(data.data.roi_min[1]);
          setMaxX(data.data.roi_max[0]);
          setMaxY(data.data.roi_max[1]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    console.log("RoiCord", roiCord);
    setOpen(false);
  };

  console.log("min", size.width);
  console.log("max", size.height);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
          <div className="w-[640px] flex flex-col space-y-4">
            {isOpen === true ? (
              <>
                <div className="w-[640px] h-[480px] self-center relative">
                  <img src={imageUrl} alt="" width={640} height={480} />
                  {/* <img src={box} alt="" width={640} height={480} /> */}
                  <Rnd
                    bounds="parent"
                    width={size.width}
                    height={size.height}
                    onResizeStop={handleResize}
                    onDrag={handleDrag}
                    lockAspectRatio={false}
                    axis="both"
                  >
                    <div
                      id="drag-wrapper"
                      className="relative"
                      style={{
                        // top: position.y,
                        // left: position.x,
                        minWidth: size.width,
                        minHeight: size.height,
                        background: "rgba(0,0,0,0.4)",
                        border: "2px solid white",
                        borderRadius: "2px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <p
                        className="absolute left-2 top-1"
                        style={{ color: "black", textAlign: "center" }}
                      >
                        {`Min( X: ${minPosX}, Y: ${minPosY} )`}
                      </p>
                      <p
                        className="absolute right-2 bottom-1"
                        style={{ color: "black", textAlign: "center" }}
                      >
                        {`Max( X: ${maxPosX}, Y: ${maxPosY} )`}
                      </p>
                    </div>
                  </Rnd>
                  {/* </Draggable> */}
                </div>
              </>
            ) : (
              <div className="w-[640px] h-[480px] self-center relative border-2 border-black">
                <img src={imageUrl} alt="" width={640} height={480} />
                <Rnd
                  bounds="parent"
                  width={size.width}
                  height={size.height}
                  enableResizing="disable"
                  onDrag="disable"
                  lockAspectRatio={false}
                  axis="both"
                >
                  <div
                    id="drag-wrapper"
                    className="relative"
                    style={{
                      top: prePosition.y,
                      left: prePosition.x,
                      minWidth: preSize.width,
                      minHeight: preSize.height,
                      // background: "rgba(0,0,0,0.4)",
                      border: "2px solid blue",
                      borderRadius: "2px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <p
                      className="absolute left-2 top-1"
                      style={{ color: "white", textAlign: "center" }}
                    >
                      {`Min( X: ${prePosition.x.toFixed(
                        0,
                      )}, Y: ${prePosition.y.toFixed(0)} )`}
                    </p>
                    <p
                      className="absolute right-2 bottom-1"
                      style={{ color: "white", textAlign: "center" }}
                    >
                      {`Max( X: ${(
                        prePosition.x + parseInt(preSize.width)
                      ).toFixed(0)}, Y: ${(
                        prePosition.y + parseInt(preSize.height)
                      ).toFixed(0)} )`}
                    </p>
                  </div>
                </Rnd>
              </div>
            )}
            <div className="w-full flex justify-center">
              {isOpen === true ? (
                <div className="p-[10px] flex space-x-2">
                  <button
                    onClick={handleAnnotationSubmit}
                    id="poppinsFont"
                    type="button"
                    // className="px-4 py-1.5 rounded-md shadow-md text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-700"
                    className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500"
                  >
                    <div className="flex flex-row self-center space-x-2">
                      <MdOutlineDownloadDone className="self-center text-2xl" />
                      <span>Set</span>
                    </div>
                  </button>
                  <Toaster />
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
                <button onClick={handleRoiOpen} className="border-black">
                  <span id="rubikFont" class="box">
                    CHANGE ROI
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <div className="w-full py-2 flex flex-row space-x-0">
                <div className="px-6 self-center flex flex-row">
                  <span
                    id="jakartaFont"
                    className="self-center font-semibold text-base"
                  >
                    X :
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
                      className="w-20 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      readOnly
                      type="number"
                      // name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      value={isOpen === true ? minX : prePosition.x.toFixed(0)}
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
                      className="w-20 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      readOnly
                      type="number"
                      // name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      value={
                        isOpen === true
                          ? maxX
                          : (prePosition.x + parseInt(preSize.width)).toFixed(0)
                      }
                      // onChange={(e) => setMailId(e.target.value)}
                    />
                    {/* <span id="jakartaFont" className="text-xs">
                  cm
                </span> */}
                  </div>
                </div>
              </div>
              <div className="w-full py-2 flex flex-row space-x-0">
                <div className="px-6 self-center flex flex-row">
                  <span
                    id="jakartaFont"
                    className="self-center font-semibold text-base"
                  >
                    Y :
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
                      className="w-20 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      readOnly
                      type="number"
                      // name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      value={isOpen === true ? minY : prePosition.y.toFixed(0)}
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
                      className="w-20 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                      readOnly
                      type="number"
                      // name="email"
                      id="rubikFont"
                      // id="email"
                      placeholder=""
                      // onchange={formik.handleChange}
                      // value={formik.values.email}
                      value={
                        isOpen === true
                          ? maxY
                          : (prePosition.y + parseInt(preSize.height)).toFixed(
                              0,
                            )
                      }
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
                onClick={handleClickOpen}
                id="poppinsFont"
                type="button"
                className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500"
              >
                <div className="flex flex-row self-center space-x-2">
                  <BiReset className="self-center text-lg" />
                  <span>Reset</span>
                </div>
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent className="flex flex-col space-y-4 m-auto">
                  <div className="m-auto text-5xl">
                    <AiOutlineExclamationCircle className="text-red-500" />
                  </div>
                  <div
                    id="poppinsFont"
                    className="text-xl m-auto flex flex-col space-y-1"
                  >
                    <span className="self-center">
                      {" "}
                      Are you sure you want to
                    </span>
                    <span className="self-center">reset these settings ?</span>
                  </div>
                  <Box sx={{ "& button": { m: 2 } }}>
                    <div className="w-full flex justify-center">
                      <button
                        id="poppinsFont"
                        className="w-24 py-2 rounded-md shadow-md bg-blue-500 text-white"
                        onClick={handleReset}
                      >
                        YES
                      </button>
                      <button
                        id="poppinsFont"
                        className="w-24 py-2 rounded-md shadow-md border border-blue-500 text-blue-500"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </Box>
                </DialogContent>
              </Dialog>
              {/* <button
                id="poppinsFont"
                type="submit"
                className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
