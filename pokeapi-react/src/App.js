import "./App.css";
import "./normalize.css";
import React, { useState, useEffect } from "react";
import PokeLoader from "./PokeLoader/PokeLoader.js";
import PokemonCard from "./PokemonCard/PokemonCard.js";
import BotonRandom from "./BotonRandom/BotonRandom.js";
import axios from "axios";

function App() {

  /* Hooks for modal loader */
  const [loader, setLoader] = useState("none");
  const showLoader = () => setLoader("block");
  const hideLoader = () => setLoader("none");

  /* Hooks for Pokemon list */
  const allPokemon = 898;
  const [pokemonList, setPokemonList] = useState([]);

  /* Hooks for button click */
  const [buttonRandom, changeButtonRandom] = useState(false);
  const toggleButtonRandom = () => changeButtonRandom(!buttonRandom);

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        showLoader();
        const pokemonArray = [];
        const keysPokemons = new Set();
        let i = 0;
        while(i < 3){
          const idPokemon = Math.floor(Math.random() * allPokemon + 1);
          const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
          if(!keysPokemons.has(idPokemon)){
            pokemonArray.push(pokemon.data);
            keysPokemons.add(idPokemon);
            i++;
          }
        }
        setPokemonList(pokemonArray);
        hideLoader();
      } catch (error) {
        console.log(error);
      }
    };
    getPokemonList();
  }, [buttonRandom]);

  return (
    <div className="App">
      <PokeLoader display={loader}/>
      {
        pokemonList.map(pokemon => <PokemonCard pokemon={pokemon} key={pokemon.id}/>)
      }
      <BotonRandom pokemonRandom = {toggleButtonRandom}/>
    </div>
  );
}

export default App;
