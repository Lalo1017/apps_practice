import React from "react";
import "./PokemonCard.css";
import cardHeader from "./bg-pattern-card.svg";

const PokemonCard = (props) => {
  return (
    <article className="card">
      <img src={cardHeader} alt="imagen de header" className="card-header" />
      <div className="card-body">
        <img
          src={
            props.pokemon.sprites.other.dream_world.front_default === null
              ? props.pokemon.sprites.front_default
              : props.pokemon.sprites.other.dream_world.front_default
          }
          alt="imagen de usuario"
          className="card-body-img"
        />
        <div className="card-body-title">
          <h2>{props.pokemon.name}</h2>
          <h3>#{props.pokemon.id}</h3>
        </div>
        <div className="card-body-text">
          {
            props.pokemon.types.map(type => 
              <h3 key={type.slot}>
                {type.type.name}
              </h3>
              )
          }
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-specification">
          <h3>{props.pokemon.weight / 10} kg</h3>
          <p>Weight</p>
        </div>
        <div className="card-footer-specification">
          <h3>{props.pokemon.height/10} m</h3>
          <p>Height</p>
        </div>
      </div>
    </article>
  );
};

export default PokemonCard;
