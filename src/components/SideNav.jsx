import { useState } from 'react'
import { first151Pokemon, getPokedexNumber, getFullPokedexNumber } from "../utils";

function SideNav({ selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu, handleCloseMenu}) {

    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if full "pokedex number" includes the current search value, return true
        if (getFullPokedexNumber(eleIndex).includes(searchValue)) { return true }
        // if the "pokemon name" includes the current search value, return true
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) { return true }
        // else, exclude value from array
        return false
    })

    return (
        <nav className={' ' + (!showSideMenu ? " open" : '')}>
            <div className={"header " + (showSideMenu ? "open" : '')}>
                <button className='open-nav-button' onClick={handleToggleMenu}>
                    <i className='fa-solid fa-arrow-left-long'></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input
                placeholder="E.g. 025 or Pikachu..."
                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
            />
            {filteredPokemon.map((pokemon) => {
                const pokemonIndex = first151Pokemon.indexOf(pokemon)
                return (
                    <button key={pokemonIndex}
                        onClick={() => {
                            setSelectedPokemon(pokemonIndex)
                            // handleToggleMenu()
                            handleCloseMenu()
                        }}
                        className={`nav-card ${pokemonIndex === selectedPokemon ? 'nav-card-selected' : ''}`}
                    >
                        <p>{getFullPokedexNumber(pokemonIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}

export default SideNav;