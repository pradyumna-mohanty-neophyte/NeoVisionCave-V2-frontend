  // import React, {
  //   useRef,
  //   //  useEffect,
  //   useState,
  // } from "react";
  // import logo from "../image/logo.jpeg";
  // // import { MdOutlineDone } from "react-icons/md";
  // // import { AiOutlineInfoCircle } from "react-icons/ai";
  // // import { IoWarningOutline } from "react-icons/io5";
  // // import { BiErrorCircle } from "react-icons/bi";
  // import { RiFullscreenFill } from "react-icons/ri";
  // import { RiFullscreenExitFill } from "react-icons/ri";
  // // import src from "../image/videostreme.mp4";
  // import { Paper, Button } from "@mui/material";
  // // import IMG from "../image/RoiImage.jpg";
 
  // // import { capture_frames } from "../authservice/api"
  // export default function Video(props) {
  //    const src = "http://localhost:8000/video-stream";
  //   const videoStream = props.videoStream;
  //   const videoRef = useRef();
  //   const [expand, setExpand] = useState(false);
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   const handleClick = async () => {
  //     const res = await capture_frames();
  //     console.log("not bad",res.data.ocr_result);
      
  //   };

  //   const handleFullscreen = () => {
  //     const element = document.documentElement; // Fullscreen the entire document
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.mozRequestFullScreen) {
  //       element.mozRequestFullScreen();
  //     } else if (element.webkitRequestFullscreen) {
  //       element.webkitRequestFullscreen();
  //     } else if (element.msRequestFullscreen) {
  //       element.msRequestFullscreen();
  //     }
  //     setExpand(true);
  //   };
  //   const togglePlayPause = () => {
  //     const video = videoRef.current;
  //     if (video.paused) {
  //       video.play();
  //       setIsPlaying(true);
  //     } else {
  //       video.pause();
  //       setIsPlaying(false);
  //     }
  //   };

  //   // const toggleFullScreen = () => {
  //   //   if (videoContainerRef.current.requestFullscreen) {
  //   //     videoContainerRef.current.requestFullscreen();
  //   //   } else if (videoContainerRef.current.mozRequestFullScreen) {
  //   //     videoContainerRef.current.mozRequestFullScreen();
  //   //   } else if (videoContainerRef.current.webkitRequestFullscreen) {
  //   //     videoContainerRef.current.webkitRequestFullscreen();
  //   //   } else if (videoContainerRef.current.msRequestFullscreen) {
  //   //     videoContainerRef.current.msRequestFullscreen();
  //   //   }
  //   // };

  //   // const handleExitFullscreen = () => {
  //   //   if (document.exitFullscreen) {
  //   //     document.exitFullscreen();
  //   //   } else if (document.mozCancelFullScreen) {
  //   //     document.mozCancelFullScreen();
  //   //   } else if (document.webkitExitFullscreen) {
  //   //     document.webkitExitFullscreen();
  //   //   } else if (document.msExitFullscreen) {
  //   //     document.msExitFullscreen();
  //   //   }
  //   //   setExpand(false);
  //   // };

  //   props.extendValue(expand);
  //   const alertTypes = ["", "success", "info", "warning", "error"];

  //   const [
  //     alertType,
  //     //  setAlertType
  //   ] = useState(alertTypes[4]);

  //   let message = "This is the alert message to be displayed!";

  //   return (
  //     <>
  //       <div id="container" className="w-full h-full">
  //         {src ? (
  //           <>
  //             <Paper elevation={4} className="w-full h-full relative p-10 ">
  //               {/* <iframe
  //                 // className="w-full h-full"
  //                 className="rounded-md"
  //                 width="100%" height="100%"
  //                 id="videoElement"
  //                 // src={videoStream}
  //                 // src={src}
  //                 src="https://www.youtube.com/embed/a6VVrAZUnsc"
  //                 title="webviewer"
  //                 frameborder="0"
  //               /> */}
  //               {/* <video
  //                 controls
  //                 className="w-full h-[90%] rounded-lg"
  //                 ref={videoRef}
  //               >
  //                 <source src={src} type="video/mp4" />
  //               </video> */}
  //               <img ref={videoRef} src={src} alt="Video Stream" controls
  //                 className="w-full h-[90%] rounded-lg" />
  //               {/* <img src={IMG} alt="" width="100%" height="100%" /> */}
  //               {/* <div className="absolute cursor-pointer z-10 bottom-5 right-5"> */}
  //                 {/* {!expand ? (
  //                   <>
  //                     <RiFullscreenFill
  //                       onClick={handleFullscreen}
  //                       className="text-white xl:text-2xl 2xl:text-3xl"
  //                     />
  //                   </>
  //                 ) : (
  //                   <>
  //                     <RiFullscreenExitFill
  //                       onClick={handleExitFullscreen}
  //                       className="text-white xl:text-2xl 2xl:text-3xl"
  //                     />
  //                   </>
  //                 )} */}
  //               {/* </div> */}
  //               {/* <div className="absolute top-0 w-full py-5 flex justify-center">
  //                 {alertTypes && (
  //                   <div
  //                     className={`flex flex-row space-x-4 px-5 py-2 rounded-md shadow-lg  text-white font-medium xl:text-base 2xl:text-lg ${
  //                       alertType === "success"
  //                         ? "bg-emerald-500"
  //                         : alertType === "info"
  //                         ? "bg-sky-500"
  //                         : alertType === "warning"
  //                         ? "bg-amber-500"
  //                         : "bg-rose-500"
  //                     }`}
  //                   >
  //                     <span className="self-center">
  //                       {alertType === "success" ? (
  //                         <MdOutlineDone className="text-white xl:text-xl 2xl:text-2xl" />
  //                       ) : alertType === "info" ? (
  //                         <AiOutlineInfoCircle className="text-white xl:text-xl 2xl:text-2xl" />
  //                       ) : alertType === "warning" ? (
  //                         <IoWarningOutline className="text-white xl:text-xl 2xl:text-2xl" />
  //                       ) : (
  //                         <BiErrorCircle className="text-white xl:text-xl 2xl:text-2xl" />
  //                       )}
  //                     </span>
  //                     <span className="drop-shadow-xl">{message}</span>
  //                   </div>
  //                 )}
  //               </div> */}
  //               <div style={{marginTop:'50px',  display:'flex', alignItems:'end', justifyContent:'center'}}>
  //               <Button sx={{ bgcolor: "#06B6D4" }} variant="contained" color="primary" className="rounded-full" onClick={handleClick}>
  //                 Capture
  //               </Button>
  //               </div>
  //             </Paper>
  //             <div style={{background:'lightgray'}} className="flex justify-around w-[100vw] h-24  mt-10 p-5 ">
  //             <Paper sx={{width:'22%'}} elevation={4}>


  // 1


  //             </Paper>
  //             <Paper  sx={{width:'22%'}} elevation={4}>2</Paper>
  //             <Paper  sx={{width:'22%'}} elevation={4}>3</Paper>
  //             <Paper  sx={{width:'22%'}} elevation={4}>4</Paper>
  //             </div>
  //           </>
  //         ) : (
  //           <>
  //             <div className="h-full flex flex-col justify-center">
  //               <img src={logo} alt="Neophyte Logo" />
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </>
  //   );
  // }
