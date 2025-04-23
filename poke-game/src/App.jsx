import "./App.css";
import Action from "./game/Buttons/Action";
import Pad from "./game/Buttons/Pad";
import StartSelect from "./game/Buttons/StartSelect";
import Screen from "./game/Screen";

function App() {
	return (
		<>
			<div className="app-wrapper">
				{/* container game */}
				<div className="game-container">
					{/* container screen */}
					<Screen />

					{/* container buttons */}
					<div className="buttons-container">
						{/* botones direcciones */}
						<Pad />
						{/* botones select y start */}
						<StartSelect />
						{/* botones A Y B */}
						<Action />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
