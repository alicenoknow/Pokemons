import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { getPokmeonInfoFromName } from "../utils/api";
import { updateStorage, initialStorage } from "../utils/storage";

interface FavContextType {
  pokemons: string[];
  addPokemon: (pokemon: string) => void;
  removePokemon: (pokemon: string) => void;
}

const FavContext = createContext<FavContextType>({
  pokemons: [],
  addPokemon: () => ({}),
  removePokemon: () => ({}),
});
export const useFavContext = (): FavContextType => useContext(FavContext);

export const FavsContextProvider = (props: {
  children: ReactNode;
}): ReactElement => {
  const { children } = props;
  const [pokemons, setPokemons] = useState<string[]>([]);

  const addPokemon = async (pokemon: string) => {
    if (pokemons.includes(pokemon)) {
      Alert.alert(pokemon + " already in your favs");
      return;
    }
    const checkInfo = await getPokmeonInfoFromName(pokemon);
    if (checkInfo) {
      const newPokemons = [...pokemons, pokemon];
      setPokemons(newPokemons);
      updateStorage(newPokemons);
      Alert.alert(pokemon + " added to your favs");
    }
  };

  const removePokemon = (pokemon: string) => {
    if (pokemons.includes(pokemon)) {
      const newPokemons = pokemons.filter((p) => p !== pokemon);
      setPokemons(newPokemons);
      updateStorage(newPokemons);
      Alert.alert(pokemon + " removed from your favs");
    }
  };

  useEffect(() => {
    async function loadPokemons() {
      const pokemons = await initialStorage();
      setPokemons(pokemons);
    }
    loadPokemons();
  }, []);

  return (
    <FavContext.Provider value={{ pokemons, addPokemon, removePokemon }}>
      {children}
    </FavContext.Provider>
  );
};
