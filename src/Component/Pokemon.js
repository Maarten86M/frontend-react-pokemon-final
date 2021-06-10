import '../App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function Pokemon(props) {

    const [pokemon, setPokemon] = useState(null);

    console.log(props, "wat is props:")

    useEffect(() => {

        async function fetchPokemon() {
            const respone = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${props.nameOfPokemon}`
            );
            setPokemon(respone.data)

        }

        fetchPokemon();

    }, [props.click]);

    return (
        <div>
            <div>
                {pokemon ?
                    <div className="pokemonContainer">
                        <b>{pokemon.name}</b>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                        <p>Moves: {pokemon.moves.length}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <div>
                            {pokemon.abilities.map((ability) => {
                                console.log(ability); // { ability: { name: "stomp" }}
                                return <p>{ability.ability.name}</p> })}
                        </div>
                    </div> : <h1>Loading</h1>
                }
            </div>
        </div>
    )
};

export default Pokemon;