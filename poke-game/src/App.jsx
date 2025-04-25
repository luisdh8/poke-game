import { useEffect, useState, useRef } from "react";
import "./App.css";
import Action from "./game/Buttons/Action";
import Pad from "./game/Buttons/Pad";
import StartSelect from "./game/Buttons/StartSelect";
import Screen from "./game/Screen";

function App() {
	const [pokemones, setPokemones] = useState([]);
	const [hoverPokemon, setHoverPokemon] = useState(1); // Empezar en 1
	const [selectedPokemones, setSelectedPokemones] = useState([]);
	const [health, setHealth] = useState([]);
	const [turn, setTurn] = useState(0);
	const [attack, setAttack] = useState("");
	const [currentPage, setCurrentPage] = useState(0); // Página actual (0-indexada)
	const ITEMS_PER_PAGE = 6; // 6 Pokémon por página (3x2 grid)
	const containerRef = useRef(null);

	const baseURL = "https://pokeapi.co/api/v2/";

	// Fetch all Pokémon (first generation)
	const getPokemones = async () => {
		try {
			const res = await fetch(`${baseURL}pokemon?limit=151`);
			const data = await res.json();
			const pokemonInfo = await getDetails(data.results);
			setPokemones(pokemonInfo);
		} catch (error) {
			console.error("Error fetching Pokémon:", error);
		}
	};

	// Get details for each Pokémon
	const getDetails = async (results) => {
		try {
			const res = await Promise.all(
				results.map((pokemon) => fetch(pokemon.url))
			);
			const data = await Promise.all(res.map((response) => response.json()));
			return data;
		} catch (error) {
			console.error("Error fetching Pokémon details:", error);
			return [];
		}
	};

	// Initialize on component mount
	useEffect(() => {
		getPokemones();
	}, []);
    
	// Get current page Pokémon
	const getCurrentPagePokemon = () => {
		if (!pokemones || pokemones.length === 0) return [];
		const startIndex = currentPage * ITEMS_PER_PAGE;
		return pokemones.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	};
    
	// Calculate total pages
	const totalPages = Math.ceil((pokemones?.length || 0) / ITEMS_PER_PAGE);

	// Check if game is over (win screen is showing)
	const isGameOver = () => {
		return health && health.length > 0 && (health[0] <= 0 || health[2] <= 0);
	};

	// Handle D-pad direction presses
	const handlePress = (dir) => {
		// Si estamos en la pantalla de Winner, cualquier botón del Pad regresa al menú principal
		if (selectedPokemones.length === 2 && isGameOver()) {
			mainMenu();
			return;
		}
        
		// Si estamos en la pantalla de selección de Pokémon
		if (!selectedPokemones.length) {
			let newHover = hoverPokemon;
			let newPage = currentPage;
            
			// Calcular el índice relativo dentro de la página actual (1-6)
			const relativeIndex = ((hoverPokemon - 1) % ITEMS_PER_PAGE) + 1;

			switch (dir) {
				case "right":
					// Mover a la derecha dentro de la página actual
					if (relativeIndex % 3 !== 0) {
						newHover += 1;
					}
					break;
                    
				case "left":
					// Mover a la izquierda dentro de la página actual
					if (relativeIndex % 3 !== 1) {
						newHover -= 1;
					}
					break;
                    
				case "up":
					// Si estamos en la fila superior (Pokémon 1-3)
					if (relativeIndex <= 3) {
						// Ir a la página anterior si es posible
						if (currentPage > 0) {
							newPage = currentPage - 1;
							// Posicionar en la fila inferior de la página anterior con la misma columna
							newHover = (newPage * ITEMS_PER_PAGE) + relativeIndex + 3;
						}
					} else {
						// Moverse a la fila superior en la página actual
						newHover -= 3;
					}
					break;
                    
				case "down":
					// Si estamos en la fila inferior (Pokémon 4-6)
					if (relativeIndex >= 4) {
						// Ir a la página siguiente si es posible
						if (currentPage < totalPages - 1) {
							newPage = currentPage + 1;
							// Posicionar en la fila superior de la página siguiente con la misma columna
							newHover = (newPage * ITEMS_PER_PAGE) + (relativeIndex - 3);
						}
					} else {
						// Moverse a la fila inferior en la página actual
						newHover += 3;
					}
					break;
                    
				default:
					break;
			}

			// Asegurarse de que el índice no supere el número total de Pokémon
			const maxPokemonIndex = Math.min(pokemones.length, (newPage + 1) * ITEMS_PER_PAGE);
			if (newHover > maxPokemonIndex) {
				newHover = maxPokemonIndex;
			}

			// Actualizar la página si cambió
			if (newPage !== currentPage) {
				setCurrentPage(newPage);
			}

			// Actualizar el Pokémon seleccionado
			setHoverPokemon(newHover);
		}
	};

	// Select Pokémon when player presses select
	const handleSelectPokemon = () => {
		if (pokemones.length === 0) return;
		
		const pokemonSelected = pokemones.filter(
			(pokemon) => pokemon.id === hoverPokemon
		);

		if (pokemonSelected.length === 0) return;

		const selections = [pokemonSelected, computerSelection()];
		setSelectedPokemones(selections);
		
		// Set initial health values [player current, player max, opponent current, opponent max]
		setHealth([
			selections[0][0].stats[0].base_stat,
			selections[0][0].stats[0].base_stat,
			selections[1][0].stats[0].base_stat,
			selections[1][0].stats[0].base_stat,
		]);
	};

	// Computer randomly selects a Pokémon
	const computerSelection = () => {
		const randomID = Math.floor(Math.random() * pokemones.length) + 1;
		const selectElement = pokemones.filter(
			(pokemon) => pokemon.id === randomID
		);
		return selectElement.length > 0 ? selectElement : [pokemones[0]];
	};

	// Handle attack moves
	const attackMove = () => {
		// Si estamos en la pantalla de Winner, botón A regresa al menú principal
		if (selectedPokemones.length === 2 && isGameOver()) {
			mainMenu();
			return;
		}
    
		if (!selectedPokemones.length || selectedPokemones.length < 2) return;
		
		const randomDamage = Math.floor(Math.random() * 40);
		
		if (turn === 0) {
			// Player's turn
			setHealth([
				health[0],
				health[1],
				Math.max(0, health[2] - randomDamage),
				health[3],
			]);
			setTurn(1);
		} else {
			// Computer's turn
			setHealth([
				Math.max(0, health[0] - randomDamage),
				health[1],
				health[2],
				health[3],
			]);
			setTurn(0);
		}
		
		const attackingPokemon = turn === 0 
			? selectedPokemones[0][0]?.name 
			: selectedPokemones[1][0]?.name;

		setAttack(`${attackingPokemon} used ${chooseAttack()}`);
	};

	// Choose a random attack from the current Pokémon's move list
	const chooseAttack = () => {
		if (!selectedPokemones[turn] || !selectedPokemones[turn][0]?.moves?.length) {
			return "Attack";
		}
		
		const moves = selectedPokemones[turn][0].moves;
		const randomAttack = Math.floor(Math.random() * moves.length);
		return moves[randomAttack].move.name;
	};

	// Return to main menu
	const mainMenu = () => {
		setSelectedPokemones([]);
		setTurn(0);
		setAttack("");
	};

	return (
		<div className="app-wrapper">
			<div className="game-container">
				<Screen
					pokemones={getCurrentPagePokemon()} // Solo enviar los Pokémon de la página actual
					hoverPokemon={hoverPokemon}
					selectedPokemones={selectedPokemones}
					health={health}
					turn={turn}
					mainMenu={mainMenu}
					attack={attack}
					containerRef={containerRef}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
				<div className="buttons-container">
					<Pad handlePress={handlePress} />
					<StartSelect handleSelectPokemon={handleSelectPokemon} />
					<Action attackMove={attackMove} />
				</div>
			</div>
		</div>
	);
}

export default App;