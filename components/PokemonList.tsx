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
        renderItem={({ item }) => renderPokemon(item)}
        onEndReachedThreshold={0.4}
        onEndReached={() => loadPokemonBatch(addPokemons, url, setUrl)}
        keyExtractor={item => item.name}
      />

    </View>);
}


const renderPokemon = (pokemonObject: PokemonInfo) => {
  const styles = StyleSheet.create({
    separator: {
      height: 1,
      width: 250,
      backgroundColor: "#3337"
    },
  });

  return ( 
    <>
     <PokemonImage url={pokemonObject.url} name={pokemonObject.name}nameToRender={pokemonObject.name} />
     <View style={styles.separator}/>
    </>
  );
}

const styles = StyleSheet.create({
  pokemon: {
    margin: 10,
    width: 200,
    height: 200,
    resizeMode: 'center'
  }
});