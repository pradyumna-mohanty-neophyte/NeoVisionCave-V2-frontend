import { React, useState } from "react";
import { BiReset } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
import IMG from "../image/RoiImage.jpg";
// import { Rnd } from "react-rnd";
import { ReactPictureAnnotation } from "react-picture-annotation";

export default function RoiNew() {
  const [isOpen, setIsOpen] = useState(false);

  const handleRoiOpen = () => {
    setIsOpen(true);
  };

  const handleRoiClose = () => {
    setIsOpen(false);
  };

  const [minX, setMinX] = useState();
  const [maxX, setMaxX] = useState();
  const [minY, setMinY] = useState();
  const [maxY, setMaxY] = useState();

  const [annotations, setAnnotations] = useState([]);

  const handleAnnotationChange = (newAnnotations) => {
    setAnnotations(newAnnotations);
  };

  const handleAnnotationSubmit = () => {
    // Extracting start and end point coordinates from the annotations
    const coordinates = annotations.map((annotation) => ({
      startPoint: {
        x: annotation.mark.x,
        y: annotation.mark.y,
      },
      endPoint: {
        x: annotation.mark.x + annotation.mark.width,
        y: annotation.mark.y + annotation.mark.height,
      },
    }));

    // Printing the coordinates in the console
    console.log("Coordinates", coordinates);

    setMinX(coordinates[0].startPoint.x.toFixed(2));
    setMinY(coordinates[0].startPoint.y.toFixed(2));
    setMaxX(coordinates[0].endPoint.x.toFixed(2));
    setMaxY(coordinates[0].endPoint.y.toFixed(2));
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
          <div className="w-[65%] flex flex-col space-y-4 ">
            {isOpen === true ? (
              <>
                <div className="w-[640px] h-[480px] self-center">
                  <ReactPictureAnnotation
                    image={IMG}
                    onSelect={handleAnnotationChange}
                    onChange={handleAnnotationChange}
                    annotationData={annotations}
                    // onUpdate={handleAnnotationUpdate}
                    width={640}
                    height={480}
                  />
                </div>
              </>
            ) : (
              <div className="w-[640px] h-[480px] self-center">
                <img src={IMG} alt="set roi" className="blur-sm" />
              </div>
            )}
            <div className="w-full flex justify-center">
              {isOpen === true ? (
                <div className="p-[10px] flex space-x-2">
                  <button
                    onClick={handleAnnotationSubmit}
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
              <div className="w-full py-2 flex flex-row xl:space-x-1 2xl:space-x-3">
                <div className="px-6 self-center flex flex-row">
                  <span id="jakartaFont" className="self-center text-base">
                    X :
                  </span>
                  {/* <AiOutlineInfoCircle className="self-center mx-2"/> */}
                </div>
                <div className="self-center flex flex-row xl:space-x-2 2xl:space-x-4">
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
                      value={minX}
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
                      value={maxX}
                      // onChange={(e) => setMailId(e.target.value)}
                    />
                    {/* <span id="jakartaFont" className="text-xs">
                  cm
                </span> */}
                  </div>
                </div>
              </div>
              <div className="w-full py-2 flex flex-row xl:space-x-1 2xl:space-x-3">
                <div className="px-6 self-center flex flex-row">
                  <span id="jakartaFont" className="self-center text-base">
                    Y :
                  </span>
                  {/* <AiOutlineInfoCircle className="self-center mx-2"/> */}
                </div>
                <div className="self-center flex flex-row xl:space-x-2 2xl:space-x-4">
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
                      value={minY}
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
                      value={maxY}
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
