import React from "react";
import "./styles/Pad.css";

export const Pad = ({handlePress}) => {
  return (
    <div className="container-dpad">
      <div className="button-dpad-empty"></div>
      <div>
        <button className="button-dpad" onClick={() => handlePress("up")}></button>
      </div>
      <div className="button-dpad-empty"></div>
      <div>
        <button className="button-dpad" onClick={() => handlePress("left")}></button>
      </div>
      <div>
        <button className="button-dpad"></button>
      </div>
      <div>
        <button className="button-dpad" onClick={() => handlePress("right")}></button>
      </div>
      <div className="button-dpad-empty"></div>
      <div>
        <button className="button-dpad" onClick={() => handlePress("down")}></button>
      </div>
      <div className="button-dpad-empty"></div>
    </div>
  );
};

export default Pad;