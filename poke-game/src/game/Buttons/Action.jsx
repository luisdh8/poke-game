import React from "react";
import "./Action.css";

export const Action = () => {
	return (
		<div className="action-container">
			<div className="button-wrapper">
				<button className="action-button">A</button>
			</div>
			<div>
				<button className="action-button">B</button>
			</div>
		</div>
	);
};

export default Action;
