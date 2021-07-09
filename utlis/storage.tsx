import { AsyncStorage } from 'react-native';

const FAV_POKEMONS = 'FavPokemons'

export async function updateStorage(newPokemonsValue: ReadonlyArray<string>) {
  try {
    await AsyncStorage.setItem(FAV_POKEMONS, JSON.stringify(newPokemonsValue));
  } catch (error) {
    console.log(error)
  }
}

async function getAllFromStorage(): Promise<string[]> {
  try {
    const pokemonListString = await AsyncStorage.getItem(FAV_POKEMONS);
    if (pokemonListString !== null) {
      return JSON.parse(pokemonListString) as string[];
    }
  } catch (error) {
    console.error(error)
  }
  return [];
}

export async function initialStorage() {
  const allKeys = await getAllFromStorage();
  return allKeys ?? [];
}

export function inFavs(name: string) {

}