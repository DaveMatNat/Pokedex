import { first151Pokemon, getPokedexNumber, getFullPokedexNumber } from "../utils";

function SideNav({ selectedPokemon, setSelectedPokemon}) {
    return (
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input placeholder="Search your Pokémon!" />
            {first151Pokemon.map((pokemon, pokemonIndex) => {
                return (
                    <button key={pokemonIndex}
                        className={'nav-card '}
                        onClick={() => { setSelectedPokemon(pokemonIndex)}}>
                        <p>{getFullPokedexNumber(pokemonIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}

export default SideNav;