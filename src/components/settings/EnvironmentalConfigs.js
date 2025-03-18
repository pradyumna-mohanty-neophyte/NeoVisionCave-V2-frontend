import {
  React,
  useState,
  // useRef,
  useEffect,
} from "react";
import Select from "react-select";
import { BiReset } from "react-icons/bi";
// import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";
import Box from "@mui/material/Box";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  // GET_DEFAULT_ENV_CONFS,
  RESET_TO_DEFAULT_ENV_CONFS,
  GET_CURRENT_ENV_CONFS,
  SET_CURRENT_ENV_CONFS,
} from "../authservice/api";
import toast, { Toaster } from "react-hot-toast";

export default function EnvironmentalConfigs() {
  // const [layoutName, setLayoutName] = useState("ip");
  // const [inputName, setInputName] = useState("input1");
  // const [input, setInput] = useState({});
  // const [isDirty, setIsDirty] = useState(false);
  // const [keyboardOpen, setKeyboardOpen] = useState(false);
  // const keyboardRef = useRef();
  const [minLength, setMinLength] = useState("");
  const [minBreadth, setMinBreadth] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [maxBreadth, setMaxBreadth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [minParcelWeight, setMinParcelWeight] = useState("");
  const [maxParcelWeight, setMaxParcelWeight] = useState("");
  // const [speed, setSpeed] = useState("1.5");
  const [envConfigs, setEnvConfigs] = useState([]);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, []);

  // const timer = useRef();

  // const onChangeAll = (inputObj) => {
  //   setInput(inputObj);
  //   setIsDirty(true);
  //   // console.log("Dirty", isDirty);
  //   // console.log("Input changed", inputObj.input4);
  //   if (inputObj.input1 === undefined || inputObj.input1 === "") {
  //   } else {
  //     setMinLength(inputObj.input1);
  //   }
  //   if (inputObj.input2 === undefined) {
  //   } else {
  //     setMinBreadth(inputObj.input2);
  //   }
  //   if (inputObj.input3 === undefined) {
  //   } else {
  //     setMinHeight(inputObj.input3);
  //   }
  //   if (inputObj.input4 === undefined) {
  //   } else {
  //     setMaxLength(inputObj.input4);
  //   }
  //   if (inputObj.input5 === undefined) {
  //   } else {
  //     setMaxBreadth(inputObj.input5);
  //   }
  //   if (inputObj.input6 === undefined) {
  //   } else {
  //     setMaxHeight(inputObj.input6);
  //   }
  //   if (inputObj.input7 === undefined) {
  //   } else {
  //     setMinParcelWeight(inputObj.input7);
  //   }
  //   if (inputObj.input8 === undefined) {
  //   } else {
  //     setMaxParcelWeight(inputObj.input8);
  //   }
  //   // if (inputObj.input9 === undefined) {
  //   // } else {
  //   //   setSpeed(inputObj.input9);
  //   // }
  // };

  // const onKeyPress = (button) => {
  //   if (button === "{shift}" || button === "{lock}") handleShift();

  //   if (button === "{clear}") clearScreen();
  // };

  // const handleShift = () => {
  //   setLayoutName((layoutName) =>
  //     layoutName === "default" ? "shift" : "default"
  //   );
  // };

  // const onChangeInput = (event) => {
  //   const inputVal = event.target.value;
  //   const updatedInputObj = {
  //     ...input,
  //     [inputName]: inputVal,
  //   };

  //   setInput(updatedInputObj, () => {
  //     keyboardRef.current.setInput(inputVal);
  //   });
  // };

  // const setActiveInput = (inputName) => {
  //   setInputName(inputName);
  //   setKeyboardOpen(true);
  // };

  // const closeKeyboard = () => {
  //   setKeyboardOpen(false);
  // };

  // const clearScreen = () => {
  //   const updatedInput = { ...input };
  //   updatedInput[inputName] = "";
  //   setInput(updatedInput, () => {
  //     keyboardRef.current.clearInput(inputName);
  //   });
  // };

  const parcelTypes = [
    {
      value: "regular",
      label: "Regular",
    },
    {
      value: "irregular",
      label: "Irregular",
    },
    {
      value: "both",
      label: "Both",
    },
  ];

  const [parcelType, setParcelType] = useState(parcelTypes[0]);

  const handleParcelTypeChange = (e) => {
    setParcelType({ id: e.value, name: e.label });
    // setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const final_dict = {
        parcel_type: envConfigs[0].label,
        parcel_min_lbh: [envConfigs[1], envConfigs[2], envConfigs[3]],
        parcel_max_lbh: [envConfigs[4], envConfigs[5], envConfigs[6]],
        parcel_min_weight: envConfigs[7],
        parcel_max_weight: envConfigs[8],
      };
      const data = await SET_CURRENT_ENV_CONFS(final_dict);
      if (data) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Error saving settings");
      }
    } catch (error) {
      console.log("error", error);
    }
    // console.log("EnvConfigs", envConfigs);
    // setIsDirty(false);
  };

  useEffect(() => {
    async function getStores() {
      try {
        const data = await GET_CURRENT_ENV_CONFS();
        // console.log(data.data);
        // console.log(" get Curent env Data", data);
        if (data) {
          setMinLength(data.data[0].data.parcel_min_lbh[0]);
          setMinBreadth(data.data[0].data.parcel_min_lbh[1]);
          setMinHeight(data.data[0].data.parcel_min_lbh[2]);
          setMaxLength(data.data[0].data.parcel_max_lbh[0]);
          setMaxBreadth(data.data[0].data.parcel_max_lbh[1]);
          setMaxHeight(data.data[0].data.parcel_max_lbh[2]);
          setParcelType(data.data[0].data.parcel_type);
          setMinParcelWeight(data.data[0].data.parcel_min_weight);
          setMaxParcelWeight(data.data[0].data.parcel_max_weight);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStores();
  }, []);

  //   console.log("min breadth", minBreadth);
  // const resetValues = () => {
  //   setParcelType(parcelTypes[0]);
  //   setMinLength("50");
  //   setMinBreadth("50");
  //   setMinHeight("10");
  //   setMaxLength("600");
  //   setMaxBreadth("400");
  //   setMaxHeight("300");
  //   setMinParcelWeight("0.05");
  //   setMaxParcelWeight("1.5");
  //   // setSpeed("1.5");
  // };

  useEffect(() => {
    setEnvConfigs([
      parcelType,
      minLength,
      minBreadth,
      minHeight,
      maxLength,
      maxBreadth,
      maxHeight,
      minParcelWeight,
      maxParcelWeight,
      // speed,
    ]);
  }, [
    parcelType,
    minLength,
    minBreadth,
    minHeight,
    maxLength,
    maxBreadth,
    maxHeight,
    minParcelWeight,
    maxParcelWeight,
    // speed,
  ]);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, []);

  const handleClickOpen = async () => {
    setOpen(true);
    // resetValues();
    // setIsDirty(false);
    // input["input1"] = "";
    // input["input2"] = "";
    // input["input3"] = "";
    // input["input4"] = "";
    // input["input5"] = "";
    // input["input6"] = "";
    // input["input7"] = "";
    // input["input8"] = "";
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = async () => {
    try {
      const data = await RESET_TO_DEFAULT_ENV_CONFS();
      console.log("handle reset value", data);
      if (data) {
        setMinLength(data.data.parcel_min_lbh[0]);
        setMinBreadth(data.data.parcel_min_lbh[1]);
        setMinHeight(data.data.parcel_min_lbh[2]);
        setMaxLength(data.data.parcel_max_lbh[0]);
        setMaxBreadth(data.data.parcel_max_lbh[1]);
        setMaxHeight(data.data.parcel_max_lbh[2]);
        setParcelType(data.data.parcel_type);
        setMinParcelWeight(data.data.parcel_min_weight);
        setMaxParcelWeight(data.data.parcel_max_weight);
        toast.success("Reset Successfull");
      } else {
        toast.error("Reset Failed");
      }
    } catch (error) {
      console.log("error", error);
    }
    console.log("EnvConfigs", envConfigs);
    setOpen(false);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full py-2 flex flex-col space-y-4">
          <div className="w-full pb-4 flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <span id="jakartaFont" className="text-base">
                Parcel Type :
              </span>
            </div>
            <div className="self-center">
              <Select
                id="rubikFont"
                className="w-40"
                options={parcelTypes}
                value={parcelType}
                onChange={handleParcelTypeChange}
              />
            </div>
          </div>
          <div className="w-full py-2 flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <span id="jakartaFont" className="self-center text-base">
                Parcel Min. L.B.H :
              </span>
            </div>
            <div className="self-center flex flex-row space-x-6">
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Min. Lenght
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    mm
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    minLength < 50 || minLength === "" || minLength > 600
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={minLength}
                  min={50}
                  max={600}
                  // onFocus={() => setActiveInput("input1")}
                  // value={input["input1"] || ""}
                  value={minLength}
                  // onChange={(e) => onChangeInput(e)}
                  onChange={(e) => setMinLength(e.target.value)}
                />
                {minLength < 50 || minLength === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 50mm
                  </span>
                ) : minLength > 600 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 640mm
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Min. Breadth
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    mm
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    minBreadth < 50 || minBreadth === "" || minBreadth > 400
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={minBreadth}
                  min={50}
                  max={400}
                  // onFocus={() => setActiveInput("input2")}
                  // value={input["input2"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={minBreadth}
                  onChange={(e) => setMinBreadth(e.target.value)}
                />
                {minBreadth < 50 || minBreadth === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 50mm
                  </span>
                ) : minBreadth > 400 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 400mm
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Min. Height
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    mm
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    minHeight < 10 || minHeight === "" || minHeight > 300
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={minHeight}
                  min={10}
                  max={300}
                  // onFocus={() => setActiveInput("input3")}
                  // value={input["input3"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={minHeight}
                  onChange={(e) => setMinHeight(e.target.value)}
                />
                {minHeight < 10 || minHeight === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 10mm
                  </span>
                ) : minHeight > 300 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 300mm
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full py-2 flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <div
                id="jakartaFont"
                className="self-center flex flex-row space-x-1 text-base"
              >
                <span id="jakartaFont" className="self-center text-base">
                  Parcel Max. L.B.H :
                </span>

                {/* <span className="">Parcel</span>
                <span>Max. L.B.H :</span> */}
              </div>
            </div>
            <div className="self-center flex flex-row space-x-6">
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Max. Lenght
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    mm
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    maxLength < 50 || maxLength === "" || maxLength > 600
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={maxLength}
                  min={50}
                  max={600}
                  // onFocus={() => setActiveInput("input4")}
                  // value={input["input4"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={maxLength}
                  onChange={(e) => setMaxLength(e.target.value)}
                />
                {maxLength < 50 || maxLength === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 50mm
                  </span>
                ) : maxLength > 600 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 600mm
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Max. Breadth
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    mm
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    maxBreadth < 50 || maxBreadth === "" || maxBreadth > 400
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={maxBreadth}
                  min={50}
                  max={400}
                  // onFocus={() => setActiveInput("input5")}
                  // value={input["input5"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={maxBreadth}
                  onChange={(e) => setMaxBreadth(e.target.value)}
                />
                {maxBreadth < 50 || maxBreadth === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 50mm
                  </span>
                ) : maxBreadth > 400 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 400mm
                  </span>
                ) : (
                  <span id="rubikFont" className="text-red-500 invisible">
                    Just an invisible div
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Max. Height
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    mm
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    maxHeight < 10 || maxHeight === "" || maxHeight > 300
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={maxHeight}
                  min={10}
                  max={300}
                  // onFocus={() => setActiveInput("input6")}
                  // value={input["input6"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                />
                {maxHeight < 10 || maxHeight === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 10mm
                  </span>
                ) : maxHeight > 300 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 300mm
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full py-2 flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <span id="jakartaFont" className="self-center text-base">
                Parcel Weight :
              </span>
            </div>
            <div className="self-center flex flex-row space-x-2">
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Min. Weight
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    kg
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    minParcelWeight < 0.05 ||
                    minParcelWeight === "" ||
                    minParcelWeight > 1.5
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={minParcelWeight}
                  min={0.05}
                  max={1.5}
                  // onFocus={() => setActiveInput("input7")}
                  // value={input["input7"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={minParcelWeight}
                  onChange={(e) => setMinParcelWeight(e.target.value)}
                />
                {minParcelWeight < 0.05 || minParcelWeight === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 0.05g
                  </span>
                ) : minParcelWeight > 1.5 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 1.5g
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
              <span className="self-center">to</span>
              <div className="flex flex-col">
                <div className="flex justify-between px-1">
                  <span
                    id="jakartaFont"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Max. Weight
                  </span>
                  <span id="jakartaFont" className="text-xs">
                    kg
                  </span>
                </div>
                <input
                  className={`w-40 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                    maxParcelWeight < 0.05 ||
                    maxParcelWeight === "" ||
                    maxParcelWeight > 1.5
                      ? "border-2 border-red-500"
                      : "border border-gray-400"
                  }`}
                  type="number"
                  id="rubikFont"
                  // placeholder={maxParcelWeight}
                  min={0.05}
                  max={1.5}
                  // onFocus={() => setActiveInput("input8")}
                  // value={input["input8"] || ""}
                  // onChange={(e) => onChangeInput(e)}
                  value={maxParcelWeight}
                  onChange={(e) => setMaxParcelWeight(e.target.value)}
                />
                {maxParcelWeight < 0.05 || maxParcelWeight === "" ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be less than 0.05g
                  </span>
                ) : maxParcelWeight > 1.5 ? (
                  <span id="rubikFont" className="text-red-500 text-xs">
                    Can't be more than 1.5g
                  </span>
                ) : (
                  <span
                    id="rubikFont"
                    className="text-red-500 text-xs invisible"
                  >
                    Just an invisible div
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* <div className="w-full py-1 flex flex-row space-x-3">
            <div className="w-[20%] px-6 self-center flex flex-row">
              <span id="jakartaFont" className="text-base">
                Conveyor Speed :
              </span>
            </div>
            <div className="self-center flex flex-col">
              <div className="w-full flex justify-end px-1">
                <span id="jakartaFont" className="text-xs">
                  m/s
                </span>
              </div>
              <input
                className={`w-32 h-10 outline-none rounded-md bg-gray-100  pl-2 ${
                  speed < 1 || speed === "" || speed > 1.5
                    ? "border-2 border-red-500"
                    : "border border-gray-400"
                }`}
                type="float"
                id="rubikFont"
                placeholder={speed}
                min={1}
                max={1.5}
                onFocus={() => setActiveInput("input9")}
                value={input["input9"] || ""}
                onChange={(e) => onChangeInput(e)}
              />
              {speed < 1 || speed === "" ? (
                <span id="rubikFont" className="text-red-500 text-xs">
                  Can't be less than 1m/s
                </span>
              ) : speed > 1.5 ? (
                <span id="rubikFont" className="text-red-500 text-xs">
                  Can't be more than 1.5m/s
                </span>
              ) : (
                <></>
              )}
            </div>
          </div> */}

          <div className="w-full py-2 px-6 flex space-x-3 justify-end">
            <button
              id="poppinsFont"
              type="button"
              className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500"
              onClick={handleClickOpen}
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
            </Dialog>
            {
              // isDirty === false ||
              minLength < 50 ||
              minLength > 600 ||
              minBreadth < 50 ||
              minBreadth > 400 ||
              minHeight < 10 ||
              minHeight > 300 ||
              maxLength < 50 ||
              maxLength > 600 ||
              maxBreadth < 50 ||
              maxBreadth > 400 ||
              maxHeight < 10 ||
              maxHeight > 300 ||
              minParcelWeight < 0.05 ||
              minParcelWeight > 1.5 ||
              maxParcelWeight < 0.05 ||
              maxParcelWeight > 1.5 ? (
                // || speed < 1 ||speed > 1.5
                <button
                  id="poppinsFont"
                  className="px-4 py-1.5 rounded-md shadow-md text-gray-400 bg-slate-300"
                >
                  Save
                </button>
              ) : (
                <button
                  id="poppinsFont"
                  type="submit"
                  className="px-4 py-1.5 rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              )
            }
            <Toaster />
          </div>
        </div>
        {/* <div
          className={`keyboardContainer absolute right-[70px] ${
            !keyboardOpen ? "hidden" : ""
          }`}
        >
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            inputName={inputName}
            layoutName={layoutName}
            onChangeAll={onChangeAll}
            onKeyPress={onKeyPress}
            layout={{
              ip: ["1 2 3", "4 5 6", "7 8 9", ". 0", "{bksp}"],
            }}
            display={{
              // "{clear}": "C",
              "{bksp}": "backspace",
              // "{enter}": "enter",
            }}
          />
          <button className="closeBtn key-btn" onClick={closeKeyboard}>
            Close Keyboard
          </button>
        </div> */}
      </div>
    </>
  );
}
