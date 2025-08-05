import { pokemonTypeColors } from "../utils";

function TypeCard({ type }) {
    return (
        <div className="type-tile" style={{ padding:"0.5rem",color: pokemonTypeColors?.[type]?.color, background: pokemonTypeColors?.[type]?.background, display:"flex"}}>
            <p>{type}</p>
        </div>
    )
}

export default TypeCard;