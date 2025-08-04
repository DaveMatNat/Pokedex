import { first151Pokemon, getPokedexNumber, getFullPokedexNumber } from "../utils";
import { useEffect, useState } from "react";
import TypeCard from "./TypeCard";
import Modal from "./Modal";

function PokeCard({ selectedPokemon }) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState(null)



    const { name, height, abilities, stats, types, moves, sprites } = data || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false }
        if (['versions', 'other'].includes(val)) { return false }
        return true
    })

    async function fetchMoveData(move, moveURL) {
        
    }

    useEffect(() => {
        // if loading, exit logic
        if (loading || !localStorage) { return }
        // check if selectedPokemon info is available in the cache
        // 1. define the cache
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        // 2. check if the selected is in the cache, else fetch from the api
        if (selectedPokemon in cache) {
            // read from cache
            setData(cache[selectedPokemon])
            return
        }

        // we passed all the cache stuff to no avail and now need to fetch the data from the api

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseURL = "https://pokeapi.co/api/v2/"
                const suffix = `pokemon/${getPokedexNumber(selectedPokemon)}`
                const finalURL = baseURL + suffix

                const res = await fetch(finalURL)
                const pokemonData = await res.json()
                console.log(pokemonData)

                setData(pokemonData)

                cache[selectedPokemon] = pokemonData
                localStorage.setItem("pokedex", JSON.stringify(cache))
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()

        // if we fetch from the api, make sure to save the information to the cache for next time
    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <div className="poke-card">
            {skill && (<Modal handleCloseModal={() => {setSkill(null)}}>
                <div>
                    <h6>Name</h6>
                    <h2></h2>
                </div>
                <div>
                    <h6>Description</h6>
                </div>
            </Modal>)}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>
            <img className="default-img" src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`} alt={`${name}-large-img`} />
            <div>
                {imgList.map((spriteURL, spriteIndex) => {
                    const imgURL = sprites[spriteURL]
                    return (
                        <img key={spriteIndex} src={imgURL} alt={`${name}-img-${spriteURL}`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const { stat, base_stat } = statObj
                    return (
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name.replaceAll("-", ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>Moves</h3>
                <div className="pokemon-move-grid">
                    {moves.map((moveObj, moveIndex) => {
                        return (
                            <button className="pokemon-move" onClick={() => { }} key={moveIndex}>
                                <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PokeCard;