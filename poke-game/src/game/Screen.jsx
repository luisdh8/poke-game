import React from "react";
import "./Screen.css";

const Screen = ({
  pokemones, 
  hoverPokemon, 
  selectedPokemones, 
  health, 
  turn, 
  mainMenu, 
  attack, 
  containerRef,
  currentPage,
  totalPages
}) => {

  const getHealthColor = (percent) => {
    if (percent > 50) return "#7ACDA8";
    if (percent > 20) return "#E6D66B";
    return "#CB6048";
  };

  const getPercent = (health, fullHealth) => {
    if (health <= 0) {
      return 0;
    } else {
      return (100 * health) / fullHealth;
    }    
  }

  const gameOver = () => {
    if (health && (health[0] <= 0 || health[2] <= 0)) {
      return true;
    } else {
      return false;
    }
  }

  // Calcular el ID local dentro de la página actual (1-6 en vez del ID global)
  const getLocalId = (globalId) => {
    return ((globalId - 1) % 6) + 1;
  }
    
  return (
    <div className="screen-wrapper">
      <div className="screen-display">
        {selectedPokemones && selectedPokemones.length === 2 ? (
          <div className="scenes-container">
            {gameOver() ? (
              <div className='screen-winner'>
                <div className='winner-text'>WINNER!</div>
                {selectedPokemones[turn === 1 ? 0 : 1] && (
                  <img 
                    src={selectedPokemones[turn === 1 ? 0 : 1][0]?.sprites?.front_default} 
                    alt="sprite-winner"
                  />
                )}
                <button className='main-menu-button' onClick={mainMenu}>Back to Main Menu</button>
              </div>
            ) : (
              <div className='battle-background'>
                <div className='container-top-pokemon'>
                  <div className='container-info'>
                    <div className='health-bar-back'>
                      <div className='pokemon-name-2'>
                        {selectedPokemones[1][0]?.name}
                      </div>
                      <div className='container-health-bar'>
                        <div className='health-bar'>
                          <div 
                            style={{
                              width: `${getPercent(health[2], health[3])}%`, 
                              height: "100%", 
                              borderRadius: "10px", 
                              backgroundColor: `${getHealthColor(getPercent(health[2], health[3]))}`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img 
                      src={selectedPokemones[1][0]?.sprites?.front_default} 
                      alt="opponent-pokemon"
                      style={{width: "60px", height: "60px"}}
                    />
                  </div>
                </div>
                <div className='container-bottom-pokemon'>
                  <div>
                    <img 
                      src={selectedPokemones[0][0]?.sprites?.back_default} 
                      alt="player-pokemon"
                      style={{width: "60px", height: "60px"}}
                    />
                  </div>
                  <div className='container-info'>
                    <div className='health-bar-back'>
                      <div className='pokemon-name-2'>
                        {selectedPokemones[0][0]?.name}
                      </div>
                      <div className='container-health-bar'>
                        <div className='health-bar'>
                          <div 
                            style={{
                              width: `${getPercent(health[0], health[1])}%`, 
                              height: "100%", 
                              borderRadius: "10px", 
                              backgroundColor: `${getHealthColor(getPercent(health[0], health[1]))}`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='attack-text'>
                  {attack}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='container-pokedex' ref={containerRef}>
            {pokemones?.map((pokemon) => (
              <div 
                key={pokemon.id} 
                className={`pokemon-card ${hoverPokemon === pokemon.id ? "hover-enabled" : ""}`}
              >
                <img 
                  className="pokemon-sprite" 
                  src={pokemon.sprites?.front_default} 
                  alt={pokemon.name}
                />
                <p className='pokemon-name'>{pokemon.name}</p>
              </div>
            ))}
            {totalPages > 1 && (
              <div className="pagination-info">
                Page {currentPage + 1}/{totalPages}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen;