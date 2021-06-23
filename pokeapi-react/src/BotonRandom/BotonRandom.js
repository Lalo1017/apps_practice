import "./BotonRandom.css"

const BotonRandom = (props) => {
    return(
        <button className="button-random" onClick={props.pokemonRandom}>
            <h2>?</h2>
            <h3>Random</h3>
        </button>
    )
}

export default BotonRandom;