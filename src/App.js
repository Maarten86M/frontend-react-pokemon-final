import './App.css';
import React, {useState, useEffect} from "react";
import Pokemon from "./Component/Pokemon";
import axios from "axios";
import poke from './assets/Poke.png'

function App() {

    const [allpokemon, setAllpokemon] = useState(null);
    const [offset, setOffset] = useState(0);
    const [click, setClick] = useState(false);

    function handleClick() {
        setOffset(offset + 20)
        setClick(!click)
    }

    function handleClickDown(){
        setOffset(offset -20)
        setClick(!click)
    }

    useEffect(() => {

        async function catchThemAll() {
            const responeAll = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
            );
            setAllpokemon(responeAll.data.results);
        }

        catchThemAll()

    }, [offset])

    return (

        <div className="container">
            <div>
                <div className="button-container">
                    <button onClick={()=> handleClickDown()} disabled={offset< 1}>Vorige</button>
                    <img src={poke} alt="Pokemon"/>
                    <button onClick={() => handleClick() }disabled={offset.length -1} >Volgende</button>
                </div>
                {allpokemon ? (
                    <div className="pokeContainer">
                        {allpokemon.map((pokemon) => {
                            return <Pokemon nameOfPokemon={pokemon.name}
                                            allpokemon={allpokemon} setAllpokemon={setAllpokemon}
                                            click={click}
                            />;
                        })}
                    </div>
                ) : (
                    <h3>Loading</h3>
                )}

            </div>
        </div>
    )
};

export default App;
