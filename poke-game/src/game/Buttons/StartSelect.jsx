import React from "react";
import "./styles/StartSelect.css";

export const StartSelect = ({ handleSelectPokemon }) => {
	return (
		<div className="start-select-main">
			<div className="button-area">
				<div className="button-group">
					<button
						className="pill-button"
						onClick={() => handleSelectPokemon()}></button>
					<span className="button-label">SELECT</span>
				</div>
				<div className="button-group">
					<button
						className="pill-button"
						onClick={() => handleSelectPokemon()}></button>
					<span className="button-label">START</span>
				</div>
			</div>
		</div>
	);
};

export default StartSelect;
