import React from "react";
import "./StartSelect.css";

export const StartSelect = () => {
  return (
    <div className="start-select-wrapper">
      <div className="start-select-container">
        <div className="button-column">
          <button className="start-select-button"></button>
          <span className="button-label">SELECT</span>
        </div>
        <div className="button-column">
          <button className="start-select-button"></button>
          <span className="button-label">START</span>
        </div>
      </div>
    </div>
  );
};

export default StartSelect;