import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PokemonImage from './PokemonImage';


type addPokemonsType = (newPokemons: ReadonlyArray<PokemonInfo>) => void;
type updateUrlType = (newUrl: string) => void;

interface PokemonInfo {
  url: string;
  name: string;
}

export default function PokemonList() {

  const [url, setUrl] = React.useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
  const [pokemons, setPokemons] = React.useState<ReadonlyArray<PokemonInfo>>([]);
  const addPokemons = (newPokemons: ReadonlyArray<PokemonInfo>) => { setPokemons([...pokemons, ...newPokemons]) }

  React.useEffect(() => { loadPokemonBatch(addPokemons, url, setUrl) }, []);

  return (
    <View>
      <FlatList
        data={pokemons}
        renderItem={(pokemon) => (<PokemonImage url={pokemon.item.url} name={pokemon.item.name} />)}
        onEndReachedThreshold={0.4}
        onEndReached={() => loadPokemonBatch(addPokemons, url, setUrl)}
        keyExtractor={item => item.name}
      />

    </View>);
}

interface PokemonJSONType {
  url: string;
  name?: string;
  sprites?: {
    front_default: string;
  }
}

function isPokemonInfo(pokemon: PokemonInfo | undefined): pokemon is PokemonInfo {
  return pokemon !== undefined;
}

async function loadPokemonBatch(updatePokemonsList: addPokemonsType, url: string, setUrl: updateUrlType) {
  try {
    const responseList = await fetch(url);
    const responseJsonList = await responseList.json();
    setUrl(responseJsonList.next)
    const pokemonsUrl: PokemonJSONType[] = responseJsonList.results
    const pokemonsPromise = pokemonsUrl.map(pokemon => getPokemonInfo(pokemon));
    const pokemonsInfo = await Promise.all(pokemonsPromise);
    const newPokemons = pokemonsInfo.filter(isPokemonInfo);
     updatePokemonsList(newPokemons)

  } catch (error) {
    console.log(error);
  }
}

async function getPokemonInfo(pokemon: PokemonJSONType): Promise<PokemonInfo | undefined> {
  try {
    const responseImage = await fetch(pokemon.url);
    const responseJsonImage = await responseImage.json();
    return { name: responseJsonImage.name, url: responseJsonImage.sprites.front_default }
  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  pokemon: {
    margin: 10,
    width: 200,
    height: 200,
    resizeMode: 'center'
  }
});