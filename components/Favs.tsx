import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { addToStorage, initialStorage } from "../utlis/storage";

const FavContext = createContext<{pokemons: string[], addPokemon: (pokemon: string) => void}>({pokemons: [], addPokemon: () => {}});

export const useFavContext = () => useContext(FavContext);

export const FavsContextProvider: React.FunctionComponent = ({ children }) => {
  const [pokemons, setPokemons] = useState<string[]>([]);

  const addPokemon = (pokemon: string) => {
    if (pokemons.includes(pokemon)) {
      Alert.alert(pokemon + ' already in your favs');
      return;
    }
    const newPokemons = [...pokemons, pokemon];
    setPokemons(newPokemons);
    addToStorage(newPokemons);
    Alert.alert(pokemon + ' added to your favs');
  }

  useEffect(() => {
      async function loadPokemons() {
        const pokemons = await initialStorage();    
        setPokemons(pokemons);
      }
      loadPokemons();
  }, [])

  return (
    <FavContext.Provider value={{ pokemons, addPokemon }}>
      {children}
    </FavContext.Provider>
  );
};
