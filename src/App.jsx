import {useEffect, useState} from 'react';
import axios from 'axios';
import Pokemon from './components/pokemon/Pokemon.jsx';
import Button from './components/button/Button.jsx';
import logo from './assets/logo.png';
import './App.css';

function App() {
    const [pokemon, setPokemons] = useState([]);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setPokemons(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint]);

    return (
        <div className="poke-deck">
            {pokemon &&
                <>
                    <img alt="logo" width="400px" src={logo}/>
                    <section className="button-bar">
                        <Button
                            disabled={!pokemon.previous}
                            clickHandler={() => setEndpoint(pokemon.previous)}
                        >
                            Vorige
                        </Button>
                        <Button
                            disabled={!pokemon.next}
                            clickHandler={() => setEndpoint(pokemon.next)}
                        >
                            Volgende
                        </Button>
                    </section>

                    <Pokemon endpoint="https://pokeapi.co/api/v2/pokemon/ditto"/>

                    {pokemon.results && pokemon.results.map((pokemon) => {
                        return <Pokemon key={pokemon.name} endpoint={pokemon.url}/>
                    })}
                </>
            }
            {loading && <p>Loading...</p>}
            {pokemon.length === 0 && error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </div>
    )
}

export default App
