import React from "react";
import "./Pad.css";

export const Pad = () => {
	return (
		<div className="pad-container">
			{/* D-pad */}
			<div className="pad-grid">
				<button className="pad-button"></button>
				<button className="pad-button"></button>
				<button className="pad-button"></button>
				<button className="pad-button"></button>
				<button className="pad-button"></button>
				<button></button>
				<button className="pad-button"></button>
				<button className="pad-button"></button>
				<button></button>
			</div>
		</div>
	);
};

export default Pad;
