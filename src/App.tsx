import { ReactElement, useState, useEffect } from 'react';
// Router
import { Switch, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
// Api
import { api } from './service/api';

export interface PokemonsData {
  name: string;
  url: string;
}

export default function App(): ReactElement {
  const [pokemons, setPokemons] = useState<PokemonsData[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<any | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [offset, setOffest] = useState<number>(api.offset);
  const [pokemonQuery, setPokemonQuery] = useState<string>('');

  const handleFetchPokemons = async () => {
    try {
      const data = await (
        await fetch(`${api.url}pokemon?limit=${api.limit}`)
      ).json();

      setPokemons(data.results);
      setFetchLoading(false);
    } catch (error) {
      setFetchError(error);
      console.log(error);
    }
  };

  const handleFetchMorePokemons = async () => {
    setIsFetchingMore(true);
    try {
      const data = await (
        await fetch(`${api.url}pokemon?limit=${api.limit}&offset=${offset}`)
      ).json();

      setPokemons(prevState => [...prevState, ...data.results]);
      setOffest(prevState => prevState + api.offset);
      setIsFetchingMore(false);
    } catch (error) {
      setFetchError(error);
      setIsFetchingMore(false);
      console.log(error);
    }
  };

  const handleSearchPokemon = async () => {
    const data = await (
      await fetch(`${api.url}pokemon?limit=${api.maxResults}`)
    ).json();
    setPokemonQuery(pokemonQuery.toLowerCase());
    const filteredResults = data.results.filter(({ name }: PokemonsData) =>
      name.includes(pokemonQuery)
    );
    setPokemons(filteredResults);
  };

  useEffect(() => {
    if (pokemonQuery.length >= 2) {
      handleSearchPokemon();
    } else {
      handleFetchPokemons();
    }
  }, [pokemonQuery]);

  return (
    <Switch>
      <Route exact path='/'>
        <Home
          pokemonQuery={pokemonQuery}
          setPokemonQuery={setPokemonQuery}
          fetchLoading={fetchLoading}
          pokemons={pokemons}
          handleFetchMorePokemons={handleFetchMorePokemons}
          isFetchingMore={isFetchingMore}
          fetchError={fetchError}
        />
      </Route>
      <Route path='/pokemon/:name'>
        <Pokemon />
      </Route>
    </Switch>
  );
}
