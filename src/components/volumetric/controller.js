// import { React, useState, useEffect, useRef } from "react";
// import axios from "axios";
// // import Switch from "@mui/material/Switch";
// // import Tooltip from "@mui/material/Tooltip";
// // import { RiRefreshFill } from "react-icons/ri";
// import CircularProgress from "@mui/material/CircularProgress";
// import Fab from "@mui/material/Fab";
// import { ImCheckmark } from "react-icons/im";
// import { ImCross } from "react-icons/im";
// import io from "socket.io-client";
// import Skeleton from "@mui/material/Skeleton";
// // import { RiAlarmWarningLine } from "react-icons/ri";
// import { TiWarningOutline } from "react-icons/ti";
// // import { MdOutlineDone } from "react-icons/md";
// // import { AiOutlineInfoCircle } from "react-icons/ai";
// // import { IoWarningOutline } from "react-icons/io5";
// // import { BiErrorCircle } from "react-icons/bi";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import Box from "@mui/material/Box";
// import { AiOutlineExclamationCircle } from "react-icons/ai";
// import { RESET_AI_ENGINE } from "../authservice/api";
// import Loader from "../others/loader";
// import "../others/loader.css";

// export default function Controller({ onClick }) {
//   // const alertTypes = ["processing", "ready", "accept", "reject", "stopped"];
//   // const [alertType, setAlertType] = useState(alertTypes[4]);
//   // let message = "Processing";
//   const [loading, setLoading] = useState(false);
//   const [successCam, setSuccessCam] = useState(true);
//   const [successWt, setSuccessWt] = useState(true);
//   const [successBar, setSuccessBar] = useState(true);
//   const [feedback, setFeedback] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [loaderOpen, setLoaderOpen] = useState(false);
//   const timer = useRef();

//   // WEB SOCKET IMPLMENT START

//   useEffect(() => {
//     const socket = io("http://localhost:9990", {
//       transports: ["websocket"],
//       cors: {
//         origin: "http://localhost:3001/",
//       },
//     });
//     socket.emit("message", "wss");
//     socket.on("status_update", (data) => {
//       setFeedback(data);
//     });

//     socket.on("weight_status", (data) => {
//       console.log("weight data", data);

//       // setSuccessWt(data);
//     });

//     socket.on("barcode_status", (data) => {
//       console.log("barcode data", data);

//       // setSuccessBar(data);
//     });

//     socket.on("camera_status", (data) => {
//       console.log("camera data", data);

//       // setSuccessCam(data);
//     });
//   }, []);

//   const buttonSxCam = {
//     ...(successCam && {
//       bgcolor: "#059669",
//       zIndex: 0,
//     }),
//     // ...(loading && {
//     //   bgcolor: "#e2e8f0",
//     //   zIndex: 0,
//     // }),
//     // ...(!successCam && {
//     //   bgcolor: "#e11d48",
//     //   zIndex: 0,
//     // }),
//   };
//   const buttonSxWt = {
//     ...(successWt && {
//       bgcolor: "#059669",
//       zIndex: 0,
//     }),
//     // ...(loading && {
//     //   bgcolor: "#e2e8f0",
//     //   zIndex: 0,
//     // }),
//     // ...(!successWt && {
//     //   bgcolor: "#e11d48",
//     //   zIndex: 0,
//     // }),
//   };
//   const buttonSxBar = {
//     ...(successBar && {
//       bgcolor: "#059669",
//       zIndex: 0,
//     }),
//     // ...(loading && {
//     //   bgcolor: "#e2e8f0",
//     //   zIndex: 0,
//     // }),
//     // ...(!successBar && {
//     //   bgcolor: "#e11d48",
//     //   zIndex: 0,
//     // }),
//   };

//   const preStartSx = {
//     bgcolor: "#e2e8f0",
//     zIndex: 0,
//   };

//   useEffect(() => {
//     return () => {
//       clearTimeout(timer.current);
//     };
//   }, []);

//   const handleButtonClick = () => {
//     onClick();
//   };

//   // const handleStart = () => {
//   //   onClick();
//   //   handleButtonClick();
//   // };

//   const onSubmitStop = async () => {
//     try {
//       const res = await axios.get("http://localhost:9990/camera/stop", {
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       if (res) {
//         // console.log("video stop");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //EDIT BUTTON REFRESH PAGE FUNCTION
//   function refreshPage() {
//     onSubmitStop();
//     timer.current = window.setTimeout(() => {
//       window.location.reload(false);
//     }, 800);
//   }

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleReset = async () => {
//     const data = await RESET_AI_ENGINE();
//   };

//   const handleConfirmReset = () => {
//     handleReset();
//     setLoaderOpen(true);
//     timer.current = window.setTimeout(() => {
//       setLoaderOpen(false);
//       handleClose();
//       // window.location.reload(false);
//     }, 1000);

//   };

//   const myStyle = {
//     maxHeight: "30px",
//     minHeight: "30px",
//     minWidth: "30px",
//     maxWidth: "30px",
//   };

//   return (
//     <>
//       {/* {!loaderOpen ? (
//         <Loader />
//       ) : ( */}
//       <div className="w-full h-full flex flex-row rounded-md shadow-md bg-white">
//         <div className="h-full px-2">
//           <div className="w-[135px] h-full flex flex-col">
//             <div className="w-full h-full flex flex-row justify-center">
//               <div className="flex w-full flex-row self-center justify-between space-x-4">
//                 <div className="relative">
//                   {successCam === undefined ? (
//                     <Fab style={myStyle} size="small" sx={preStartSx}>
//                       <ImCheckmark className="text-white" />
//                     </Fab>
//                   ) : (
//                     <Fab style={myStyle} size="small" sx={buttonSxCam}>
//                       {successCam ? (
//                         <ImCheckmark className="text-white" />
//                       ) : (
//                         <ImCross className="text-white" />
//                       )}
//                     </Fab>
//                   )}

//                   {loading && (
//                     <CircularProgress
//                       size={39}
//                       sx={{
//                         color: "#059669",
//                         top: -4,
//                         left: -4,
//                         zIndex: 1,
//                       }}
//                       className="absolute"
//                     />
//                   )}
//                   <div className="absolute w-full h-full top-0 z-10"></div>
//                 </div>
//                 <div className="flex flex-row space-x-1">
//                   <div
//                     id="poppinsFont"
//                     className="font-bold text-blue-800 self-center"
//                   >
//                     Camera
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full h-full flex flex-row justify-center">
//               <div className="flex w-full flex-row self-center justify-between space-x-4">
//                 <div className="relative">
//                   {successWt === undefined ? (
//                     <Fab style={myStyle} size="small" sx={preStartSx}>
//                       <ImCheckmark className="text-white" />
//                     </Fab>
//                   ) : (
//                     <Fab style={myStyle} size="small" sx={buttonSxWt}>
//                       {successWt ? (
//                         <ImCheckmark className="text-white" />
//                       ) : (
//                         <ImCross className="text-white" />
//                       )}
//                     </Fab>
//                   )}

//                   {loading && (
//                     <CircularProgress
//                       size={39}
//                       sx={{
//                         color: "#059669",
//                         top: -4,
//                         left: -4,
//                         zIndex: 1,
//                       }}
//                       className="absolute"
//                     />
//                   )}
//                   <div className="absolute w-full h-full top-0 z-10"></div>
//                 </div>
//                 <div className="flex flex-row space-x-1">
//                   <div
//                     id="poppinsFont"
//                     className="font-bold text-blue-800 self-center"
//                   >
//                     Weight
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full h-full flex flex-row justify-center">
//               <div className="flex w-full flex-row self-center justify-between space-x-4">
//                 <div className="relative">
//                   {successBar === undefined ? (
//                     <Fab style={myStyle} size="small" sx={preStartSx}>
//                       <ImCheckmark className="text-white" />
//                     </Fab>
//                   ) : (
//                     <Fab style={myStyle} size="small" sx={buttonSxBar}>
//                       {successBar ? (
//                         <ImCheckmark className="text-white" />
//                       ) : (
//                         <ImCross className="text-white" />
//                       )}
//                     </Fab>
//                   )}

//                   {loading && (
//                     <CircularProgress
//                       size={39}
//                       sx={{
//                         color: "#059669",
//                         top: -4,
//                         left: -4,
//                         zIndex: 1,
//                       }}
//                       className="absolute"
//                     />
//                   )}
//                   <div className="absolute w-full h-full top-0 z-10"></div>
//                 </div>
//                 <div className="flex flex-row space-x-1">
//                   <div
//                     id="poppinsFont"
//                     className="font-bold text-blue-800 self-center"
//                   >
//                     Barcode
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full h-full flex-grow flex flex-col justify-around space-y-2">
//           <div className="w-full px-2 flex justify-center">
//             {feedback ? (
//               <div
//                 className={`flex w-full justify-center flex-row space-x-4 px-5 py-3.5 rounded-md shadow-lg  text-white font-medium text-base`}
//                 style={{ backgroundColor: feedback.color }}
//               >
//                 <span id="poppinsFont" className="drop-shadow-xl text-lg">
//                   {feedback.message}
//                 </span>
//               </div>
//             ) : (
//               <>
//                 <Skeleton variant="rounded" width={"100%"} height={55} />
//               </>
//             )}
//           </div>
//           <div className="w-full flex flex-col space-y-6">
//             <div className="w-full flex justify-evenly">
//               <button
//                 id="poppinsFont"
//                 type="button"
//                 onClick={handleButtonClick}
//                 className="w-28 py-2 bg-emerald-600 self-center text-white text-md rounded-md"
//               >
//                 START
//               </button>

//               <button
//                 id="poppinsFont"
//                 type="button"
//                 onClick={onSubmitStop}
//                 className="py-2 w-28 bg-[#fb1751] self-center text-white text-md rounded-md"
//               >
//                 STOP
//               </button>

//               <button
//                 id="poppinsFont"
//                 type="button"
//                 onClick={refreshPage}
//                 className="py-2 w-28 bg-blue-600 self-center text-white text-md rounded-md"
//               >
//                 REFRESH
//               </button>
//             </div>
//             <div className="w-full flex justify-center">
//               <button
//                 id="poppinsFont"
//                 type="button"
//                 onClick={handleOpen}
//                 className="py-2 px-8 bg-amber-600 self-center text-white text-md rounded-md"
//               >
//                 <div className="flex space-x-4">
//                   <TiWarningOutline className="text-white text-2xl self-start" />
//                   <span>WEIGHT TARE</span>
//                 </div>
//               </button>
//               <Dialog
//                 open={open}
//                 // onClose={handleClose}
//               >
//                 <DialogContent className="">
//                   {loaderOpen ? (
//                     <Loader />
//                   ) : (
//                     <div className="w-full h-full flex flex-col space-y-4 m-auto">
//                       <div className="m-auto text-5xl">
//                         <AiOutlineExclamationCircle className="text-[#fb1751]" />
//                       </div>
//                       <div
//                         id="poppinsFont"
//                         className="m-auto flex flex-col space-y-3"
//                       >
//                         <span className="text-xl text-wrap text-center self-center">
//                           {" "}
//                           Are you sure you want to <br /> tare the Weight
//                           ?
//                           {/* </span>
//                         <span className="text-xl self-center"> */}
//                         </span>
//                         <span className=" text-sm text-gray-600 self-center">
//                           (This process may take a minute)
//                         </span>
//                       </div>
//                       <Box sx={{ "& button": { m: 1 } }}>
//                         <div className="w-full flex justify-center">
//                           <button
//                             id="poppinsFont"
//                             className="w-24 py-1 rounded-md shadow-md bg-[#fb1751] text-white"
//                             onClick={handleConfirmReset}
//                           >
//                             YES
//                           </button>
//                           <button
//                             id="poppinsFont"
//                             className="w-24 py-2 rounded-md shadow-md border border-gray-600 text-gray-600"
//                             onClick={handleClose}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </Box>
//                     </div>
//                   )}
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* )} */}
//     </>
//   );
// }
