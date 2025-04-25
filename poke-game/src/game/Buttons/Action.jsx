import React from "react";
import "./styles/Action.css";

export const Action = ({attackMove}) => {
	return (
		<div className="action-container">
			<div className="button-wrapper">
				<button className="action-button" onClick={() => attackMove()}>A</button>
			</div>
			<div>
				<button className="action-button" onClick={() => attackMove()}>B</button>
			</div>
		</div>
	);
};

export default Action;
