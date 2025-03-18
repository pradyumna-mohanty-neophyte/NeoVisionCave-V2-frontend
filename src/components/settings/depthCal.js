import { React, useState, useEffect, useRef } from "react";
// import { BiReset } from "react-icons/bi";
// import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { BsCheckLg } from "react-icons/bs";
// import Box from "@mui/material/Box";
// import { AiOutlineExclamationCircle } from "react-icons/ai";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
import {
  SAVE_CALIBRATED_DEPTH,
  AUTO_CALIBRATE_DEPTH,
  GET_CURRENT_DEPTH,
} from "../authservice/api";
import toast, { Toaster } from "react-hot-toast";
export default function DepthCal() {
  const [isDirty, setIsDirty] = useState(false);
  const [depthConfigs, setDepthConfigs] = useState([]);
  // const camHeights = [
  //   {
  //     value: "1000",
  //     label: "1000 mm",
  //   },
  //   {
  //     value: "1200",
  //     label: "1200 mm",
  //   },
  //   {
  //     value: "1300",
  //     label: "1300 mm",
  //   },
  // ];

  const [camHeight, setCamHeight] = useState("300");
  const [camDepth, setCamDepth] = useState();
  // const [open, setOpen] = useState(false);
  // const handleCamHeightChange = (e) => {
  //   setCamHeight({ id: e.value, name: e.label });
  // };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    bgcolor: "#3b82f6",
    ...(success && {
      bgcolor: "#10b981",
      "&:hover": {
        bgcolor: "#047857",
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    async function getCurrentDepth() {
      try {
        const data = await GET_CURRENT_DEPTH();
        console.log(data);
        if (data) {
          setCamDepth(data.data[0].data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentDepth();
  }, []);
  console.log("camera depth", camDepth);

  const handleButtonClick = async () => {
    try {
      const data = await AUTO_CALIBRATE_DEPTH();
      if (data) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setIsDirty(true);
          setCamDepth(data.data[0].data);
        }, 4000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCamHeight = (e) => {
    setCamHeight(e.target.value);
    setIsDirty(true);
  };
  // const handleCamDepth = () => {
  //   setCamDepth("400");
  //   setIsDirty(true);
  // };
  useEffect(() => {
    setDepthConfigs([camHeight, camDepth]);
  }, [camHeight, camDepth]);

  const handleSave = async () => {
    const final_Data = {
      depth_value: camDepth,
      cam_height: camHeight,
    };
    try {
      const data = await SAVE_CALIBRATED_DEPTH(final_Data);
      if (data) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Error saving settings");
      }
    } catch (error) {
      console.log("error");
    }
    console.log("DepthConfigs", depthConfigs);
    setIsDirty(false);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  //   setCamHeight("1000");
  //   setCamDepth("300");
  //   setIsDirty(false);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleReset = () => {
  //   console.log("DepthConfigs", depthConfigs);
  //   setOpen(false);
  // };

  return (
    <>
      <div className="w-full flex flex-col">
        {/* <span
          id="jakartaFont"
          className="w-full px-6 py-4 border-b text-xl font-extrabold"
        >
          Depth Calibration
        </span> */}
        <div className="w-full py-2 flex flex-col space-y-2">
          <div className="w-full flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <span id="jakartaFont" className="text-base">
                Camera Height :
              </span>
              {/* <AiOutlineInfoCircle className="self-center mx-2"/> */}
            </div>
            <div className="self-center flex flex-col">
              <span id="jakartaFont" className="text-xs flex justify-end pr-1">
                mm
              </span>
              <input
                className="w-40 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                // readOnly
                type="number"
                // name="email"
                id="rubikFont"
                // id="email"
                placeholder={camHeight}
                value={camHeight}
                onChange={(e) => handleCamHeight(e)}
                // value={formik.values.email}
                // value={mailId}
                // onChange={(e) => setMailId(e.target.value)}
              />
              <span id="jakartaFont" className="text-xs invisible">
                mm
              </span>
            </div>
            {/* <div className="self-center">
              <Select
                // styles={colourStyles}
                id="rubikFont"
                className="w-40"
                options={camHeights}
                defaultValue={camHeight}
                onChange={handleCamHeightChange}
              />
            </div> */}
          </div>
          <div className="w-full py-2 flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <span id="jakartaFont" className="text-base">
                Depth :
              </span>
              {/* <AiOutlineInfoCircle className="self-center mx-2"/> */}
            </div>
            <div className="flex flex-row space-x-10">
              <div className="self-center flex flex-col">
                <span
                  id="jakartaFont"
                  className="text-xs flex justify-end pr-1"
                >
                  mm
                </span>
                <input
                  className="w-40 h-10 outline-none rounded-md border border-gray-400 bg-gray-100 pl-2"
                  readOnly
                  type="number"
                  name="email"
                  id="rubikFont"
                  // id="email"
                  // placeholder={camDepth}
                  // onchange={formik.handleChange}
                  value={camDepth}
                  // value={mailId}
                  // onChange={(e) => setMailId(e.target.value)}
                />
                <span id="jakartaFont" className="text-xs invisible">
                  mm
                </span>
              </div>
              <div className="self-center flex flex-row space-x-3">
                {/* <button id="sofiaFont" class="btn">
                  CALIBRATE
                </button> */}
                <Button
                  variant="contained"
                  sx={buttonSx}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  {/* Accept terms */}
                  {success ? (
                    <span>Calibrated</span>
                  ) : loading ? (
                    <>Calibrating</>
                  ) : (
                    <span>Auto Calibrate</span>
                  )}
                </Button>
                {loading && (
                  <div className="self-center flex flex-col justify-center">
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "#2563eb",
                        // position: "absolute",
                        // top: "50%",
                        // left: "50%",
                        // marginTop: "-12px",
                        // marginLeft: "-12px",
                      }}
                    />
                  </div>
                )}

                {success ? (
                  <>
                    <div className="self-center flex flex-col justify-center">
                      <BsCheckLg className="text-emerald-600 text" />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {success ? (
                  <>
                    <div className="self-center flex flex-col justify-center text-gray-500 text-sm">
                      ( Click on Save to apply the changes )
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* <div className="absolute left-[50%] top-[16]">
              <button id="sofiaFont" class="btn">
                CALIBRATE
              </button>
            </div> */}
          </div>

          <div className="w-full py-2 px-6 flex space-x-3 justify-end">
            {/* <button
              onClick={handleClickOpen}
              id="poppinsFont"
              type="button"
              className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500"
            >
              <div className="flex flex-row self-center space-x-2">
                <BiReset className="self-center text-lg" />
                <span>Reset</span>
              </div>
            </button> */}
            {/* <Dialog open={open} onClose={handleClose}>
              <DialogContent className="flex flex-col space-y-4 m-auto">
                <div className="m-auto text-5xl">
                  <AiOutlineExclamationCircle className="text-red-500" />
                </div>
                <div
                  id="poppinsFont"
                  className="text-xl m-auto flex flex-col space-y-1"
                >
                  <span className="self-center"> Are you sure you want to</span>
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
            </Dialog> */}
            {isDirty ? (
              <button
                onClick={handleSave}
                id="poppinsFont"
                type="submit"
                className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500"
              >
                Save
              </button>
            ) : (
              <button
                id="poppinsFont"
                className="px-4 py-1.5 rounded-md shadow-md text-gray-400 bg-slate-300"
              >
                Save
              </button>
            )}
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
}
