import React, { useState } from "react";
import IMG from "../image/D18.jpg";

const Rectangle = ({ imageUrl }) => {
  console.log("reactangle start ", imageUrl);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const handleClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (!startPoint) {
      // Set the start point of the rectangle
      setStartPoint({ x: offsetX, y: offsetY });
    } else if (!endPoint) {
      // Set the end point of the rectangle
      setEndPoint({ x: offsetX, y: offsetY });
    } else {
      // Reset the points if both start and end points are set
      setStartPoint(null);
      setEndPoint(null);
    }
  };

  console.log("startPoint", startPoint);
  console.log("end point", endPoint);
  const handleResize = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (startPoint && endPoint) {
      const newEndPoint = { x: offsetX, y: offsetY };
      setEndPoint(newEndPoint);
    }
  };

  // const renderRectangle = () => {
  let rectangleStyle;
  if (startPoint && endPoint) {
    //     console.log("image view")
    const width = Math.abs(endPoint.x - startPoint.x);
    const height = Math.abs(endPoint.y - startPoint.y);
    const left = Math.min(startPoint.x, endPoint.x);
    const top = Math.min(startPoint.y, endPoint.y);

    rectangleStyle = {
      position: "absolute",
      border: "1px solid red",
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
      pointerEvents: "none",
    };
  }

  //     return (
  // <div style={rectangleStyle}>
  //   <img
  //     src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
  //     alt="Resizable Rectangle"
  //     style={{ width: "100%", height: "100%" }}
  //   />
  // </div>
  //     );
  //   }
  //   return null;

  // };

  return (
    <div
      style={{ position: "relative" }}
      onClick={handleClick}
      onMouseMove={handleResize}
    >
      <div style={rectangleStyle}>
        <img
          src={IMG}
          alt="Resizable Rectangle"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {/* {renderRectangle()} */}
    </div>
  );
};

export default Rectangle;
