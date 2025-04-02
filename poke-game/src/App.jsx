import "./App.css";

function App() {
	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				{/* container game */}
				<div
					style={{
						width: "350px",
						height: "500px",
						backgroundColor: "red",
					}}>
					{/* container screen */}
					<div
						style={{
							paddingTop: "5%",
							paddingBottom: "5%",
							justifyContent: "center",
							display: "flex",
						}}>
						<div
							style={{
								width: "85%",
								height: "200px",
								backgroundColor: "olive",
							}}></div>
					</div>

					{/* container buttons */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
						}}>
						{/* botones direcciones */}
						<div
							style={{
								width: "60px",
								height: "60px",
								backgroundColor: "black",
							}}>
							{/* D-pad */}
							<div style={{ display: "grid" }}>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button></button>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button
									style={{
										backgroundColor: "blue",
										width: "40px",
										height: "40px",
									}}></button>
								<button></button>
								
							</div>
						</div>
						{/* botones select y start */}
						<div style={{ paddingTop: "30%" }}>
							<div
								style={{
									width: "60px",
									height: "60px",
									backgroundColor: "gray",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
								}}>
								<button
									style={{
										backgroundColor: "blue",
										width: "100%",
										height: "20px",
									}}>
									Select
								</button>
								<button
									style={{
										backgroundColor: "blue",
										width: "100%",
										height: "20px",
									}}>
									Start
								</button>
							</div>
						</div>
						{/* botones A Y B */}
						<div
							style={{
								width: "60px",
								height: "60px",
								display: "flex",
								flexDirection: "column",
								backgroundColor: "black",
							}}>
							<div style={{ paddingLeft: "50%" }}>
								<button
									style={{
										backgroundColor: "#821660",
										width: "40px",
										height: "40px",
										borderRadius: "50%",
									}}>
									A
								</button>
							</div>
							<div>
								<button
									style={{
										backgroundColor: "#821660",
										width: "40px",
										height: "40px",
										borderRadius: "50%",
									}}>
									B
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
