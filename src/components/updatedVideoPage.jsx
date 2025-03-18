import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faPause, faExpand } from "@fortawesome/free-solid-svg-icons";
import "./video.css";
// import vdo from './hola.mkv';
// import src from "../Videos/samplevideo.mp4";
import src from "./image/videostreme.mp4";

// import { getVideoData } from '../../../../api/sentinelAPI';

// const timestamps = [
//   { start: 60, end: 70 },
//   { start: 100, end: 110 },
//   { start: 120, end: 130 },
//   { start: 150, end: 160 },
//   { start: 200, end: 210 },
//   { start: 300, end: 310 },
//   { start: 400, end: 410 },
//   // { start: 60, end: 70 },
// ];
const timestamps = [];

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timevar, setTimevar] = useState(0);
  //   const [val, setVal]= useState("");
  //   const [source, setSource] = useState(null);
  const videoRef = useRef();
  const videoContainerRef = useRef();

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;
    // console.log(video.currentTime);

    // Check if duration is available before calculating progress
    if (video.duration) {
      const progressValue = (video.currentTime / video.duration) * 100;
      setProgress(progressValue);
    }
  };

  const toggleFullScreen = () => {
    if (videoContainerRef.current.requestFullscreen) {
      videoContainerRef.current.requestFullscreen();
    } else if (videoContainerRef.current.mozRequestFullScreen) {
      videoContainerRef.current.mozRequestFullScreen();
    } else if (videoContainerRef.current.webkitRequestFullscreen) {
      videoContainerRef.current.webkitRequestFullscreen();
    } else if (videoContainerRef.current.msRequestFullscreen) {
      videoContainerRef.current.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    // Check if video is defined before adding event listener
    if (video) {
      video.addEventListener("timeupdate", handleProgress);
    }

    return () => {
      // Check if video is defined before removing event listener
      if (video) {
        video.removeEventListener("timeupdate", handleProgress);
      }
    };
  }, []);

  useEffect(() => {
    const checkTimestamps = () => {
      if (isPlaying) {
        const currentTime = videoRef.current.currentTime;

        const matchingRange = timestamps.find(
          (range) => currentTime >= range.start && currentTime <= range.end,
        );

        if (!matchingRange && timestamps.length - 1 >= timevar) {
          // videoRef.current.seek(timestamps[timevar].start);
          videoRef.current.currentTime = timestamps[timevar].start;
          setTimevar(1 + timevar);
          //   console.log(timevar);
          //   console.log(timestamps.length);
        } else if (!matchingRange && timevar === timestamps.length) {
          setIsPlaying(false);
          videoRef.current.pause();
          setTimevar(0);
        }
      }
    };

    const intervalId = setInterval(checkTimestamps, 100); // Check every 100ms

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [timestamps, isPlaying, timevar]);

  //   const isInHighlightRange = (value) => {
  //     return timestamps.some(
  //       (range) => value >= range.start && value <= range.end
  //     );
  //   };
  //   console.log(isInHighlightRange(80));

  //   const sliderClassName = isInHighlightRange(progress) ? 'range-slider highlighted progress-bar' : 'range-slider progress-bar';

  //   useEffect(() => {
  //     async function getdata() {
  //       try {
  //         const data = await getVideoData();

  //         // console.log(data.data);
  //         setSource(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getdata();
  //     // eslint-disable-next-line
  //   }, []);
  //   // console.log(source);
  //   console.log(vdosrc);

  return (
    <div ref={videoContainerRef} className="video-component">
      {src ? (
        <video ref={videoRef} onClick={togglePlayPause}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <p>no video</p>
      )}
      <div className="controls">
        <div className="top-controls">
          <button onClick={togglePlayPause} className="play-pause-btn">
            {/* <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /> */}
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div
            className="childDiv"
            // style={{
            //   marginLeft: "30px",
            //   width: "calc(100% - 30px)",

            //   //   width: "100%",
            //   height: "5px",
            //   position: "absolute",
            // }}
          >
            {videoRef.current &&
              timestamps.map((times, index) => {
                const totaltime = videoRef.current.duration;
                const wid = ((times.end - times.start) / totaltime) * 100;
                const lfm = (times.start / totaltime) * 100;

                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      width: wid + "%",
                      height: "5px",
                      backgroundColor: "green",
                      left: lfm + "%",
                    }}
                  ></div>
                );
              })}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              console.log(e.target.value);
              const newTime =
                (videoRef.current.duration / 100) * e.target.value;
              videoRef.current.currentTime = newTime;
              setProgress(parseInt(e.target.value));
            }}
            className="progress-bar"
            style={{ backgroundColor: "rgba(0, 0, 255, 0.1)", zIndex: "2" }}
            step={0.1}
          />
        </div>
        <div className="bottom-controls">
          <input type="text" placeholder="Search" className="search-bar" />
          <button onClick={toggleFullScreen} className="fullscreen-btn">
            {/* <FontAwesomeIcon icon={faExpand} /> */}
            expand/ close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
