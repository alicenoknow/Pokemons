import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PokemonImage from './PokemonImage';
import {loadPokemonBatch} from '../utlis/api'
import { PokemonInfo } from '../types';


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


const styles = StyleSheet.create({
  pokemon: {
    margin: 10,
    width: 200,
    height: 200,
    resizeMode: 'center'
  }
});