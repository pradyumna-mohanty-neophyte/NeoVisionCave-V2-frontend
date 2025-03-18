import React, { useEffect, useState } from "react";

// import { MdClass } from "react-icons/md";
// import { FaCube } from "react-icons/fa";
// import { FaRulerHorizontal } from "react-icons/fa";
// import { TbLineHeight } from "react-icons/tb";
// import { CgDisplayFullwidth } from "react-icons/cg";
// import { FaWeightHanging } from "react-icons/fa";
import io from "socket.io-client";

// import Logo from "../image/NeoPhyte_logo.gif";
// import socketIOClient from "socket.io-client";
// import axios from "axios";
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import useWebSocket, { ReadyState } from "react-use-websocket";

export default function DetectedResult() {
  // const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:9990/get_results");
  // const [messageHistory, setMessageHistory] = useState([]);

  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  // // console.log("lastMessage", lastMessage)

  // const [response, setReponse] = useState(false);
  const [chat, setChat] = useState([]);

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev) => prev.concat(lastMessage));

  //     // console.log(lastMessage);
  //     setReponse(lastMessage);
  //     // setChat(oldChats =>[lastMessage.data, ...oldChats])
  //   }
  // }, [lastMessage, setMessageHistory]);

  // let dataResult = "";
  // // console.log("dhddh",chat)

  // if (response) {
  //   dataResult = response.data;
  // }

  // const arr = ["First item", "Second item", "Third item"];

  // arr.push(dataResult);

  // let array_image = [];
  // const split_lbh_image = dataResult;
  // console.log(split_lbh_image);
  // array_image.push(split_lbh_image);

  // console.log("array_image", arr);

  // let months = ["January", "February", "Monday", "Tuesday"];
  // months.splice(0, 0, "March", "hwdgygdwy");

  // console.log(months);
  // console.log("allDataEntry", allDataEntry);

  // const byteArray = img_byte.getBytes("UTF-8");
  // console.log("imageData", byteArray)
  // const imageData =`data:image/jpeg;base64,${split_img}`

  // const SERVER = "http://localhost:9990";
  // var socket = io(SERVER);
  // console.log("socket", socket)
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
      // console.log(data);
      setLbhData(data);
      setCloneLbh(data.data);
      setChat((oldChats) => [data.data, ...oldChats]);
    });
  }, []);

  // socket.on("connection",(data) => {
  //   console.log("connection",data)
  //   // setLbhData(data)

  // })

  // useEffect(() => {
  //     socket.on("get_results",(data) => {
  //       console.log("get_results",data)
  //       setLbhData(data)
  //     })
  // },[])

  // console.log("lbhData", lbhData);

  const copyofCloneArray = [...cloneLbh];

  var allData = [];
  allData.unshift(copyofCloneArray);

  // console.log("cloneLbh", allData);

  // console.log(result)

  return (
    <>
      <div className="w-full h-full flex flex-col lg:space-y-3 2xl:space-y-4">
        <div className="w-full h-12 shadow-md rounded-md bg-slate-500 font-black flex justify-around">
          <div className="w-full h-full justify-center font-bold lg:text-xl 2xl:text-2xl flex">
            <span
              id="poppinsFont"
              className="self-center pl-2 text-white tracking-wider"
            >
              Product Profiles
            </span>
          </div>
        </div>
        <div className="flex-grow rounded-md shadow-md bg-white overflow-y-auto">
          <table className="w-full sm:bg-white border rounded-lg table-auto">
            <thead className="w-full h-10 bg-emerald-500 text-white font-extrabold lg:text-md 2xl:text-lg">
              <tr id="poppinsFont" className="tracking-wider font-semibold">
                <th className="">EAN</th>
                <th className="">L</th>
                <th className="">B</th>
                <th className="">H</th>
                <th className="">Wt</th>
                {/* <th className="">
                  Vol(mm<sup>3</sup>)
                </th> */}
              </tr>
            </thead>
            <tbody
              id="poppinsFont"
              className="w-full text-center font-semibold divide-y"
            >
              {chat &&
                chat.map((val, id) => (
                  <tr key={id}>
                    <td className="p-2">{val[4]}</td>
                    <td>{val[0].toFixed(2)}</td>
                    <td>{val[1].toFixed(2)}</td>
                    <td>{val[2].toFixed(2)}</td>
                    <td>{val[3].toFixed(2)}</td>
                    {/* <td>
                      {(val[0] * val[1] * val[2]).toFixed(2)} cm<sup>3</sup>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
