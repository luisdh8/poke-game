import React from "react";
import "./styles/Pad.css";

export const Pad = () => {
  return (
    <div className="container-dpad">
      <div className="button-dpad-empty"></div>
      <div>
        <button className="button-dpad"></button>
      </div>
      <div className="button-dpad-empty"></div>
      <div>
        <button className="button-dpad"></button>
      </div>
      <div>
        <button className="button-dpad"></button>
      </div>
      <div>
        <button className="button-dpad"></button>
      </div>
      <div className="button-dpad-empty"></div>
      <div>
        <button className="button-dpad"></button>
      </div>
      <div className="button-dpad-empty"></div>
    </div>
  );
};

export default Pad;