import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { updateStorage, initialStorage } from "../utlis/storage";

const FavContext = createContext<{pokemons: string[], addPokemon: (pokemon: string) => void, removePokemon: (pokemon: string) => void}>({pokemons: [], addPokemon: () => {}, removePokemon: () => {}});

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
    updateStorage(newPokemons);
    Alert.alert(pokemon + ' added to your favs');
  }

  const removePokemon = (pokemon: string) => {
    if (pokemons.includes(pokemon)) {
      const index = pokemons.indexOf(pokemon);
      if (index > -1) {
        pokemons.splice(index, 1);
        setPokemons(pokemons)
        updateStorage(pokemons);
        Alert.alert(pokemon + ' removed from your favs');
      }
    }
  }

  useEffect(() => {
      async function loadPokemons() {
        const pokemons = await initialStorage();    
        setPokemons(pokemons);
      }
      loadPokemons();
  }, [])

  return (
    <FavContext.Provider value={{ pokemons, addPokemon, removePokemon }}>
      {children}
    </FavContext.Provider>
  );
};
