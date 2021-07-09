import React, { createContext, useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { addToStorage, initialStorage } from "../utlis/storage";

const FavContext = createContext<{pokemons: string[], addPokemon: (pokemon: string) => void}>({pokemons: [], addPokemon: () => {}});

export const useFavContext = () => useContext(FavContext);

export const FavsContextProvider: React.FunctionComponent = ({ children }) => {
  const [pokemons, setPokemons] = useState<string[]>([]);

  const addPokemon = (pokemon: string) => {
    setPokemons([...pokemons, pokemon]);
    addToStorage(pokemon, pokemon);
  }

  useEffect(() => {
      async function loadPokemons() {
        const pokemons = await initialStorage();    
        setPokemons(pokemons);
      }
      loadPokemons();
  }, [])

  return (
    <FavContext.Provider value={{ pokemons, addPokemon}}>
      {children}
    </FavContext.Provider>
  );
};
