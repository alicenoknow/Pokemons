import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import PokemonImage from './PokemonImage';
import { getPokmeonInfoFromName, isPokemonInfo } from '../utlis/api'
import { PokemonInfo } from '../types';
import { useEffect } from 'react';
import { useFavContext } from './Favs';
import { useState } from 'react';
import Map from './Map';

export default function FavsList() {

  const [pokemonObjects, setPokemonObjects] = useState<PokemonInfo[]>([]);
  const { pokemons } = useFavContext();

  useEffect(() => {
    async function loadPokemonObjects() {
      const pokemonObjectFetch = pokemons.map(getPokmeonInfoFromName);
      const newPokemonObjects = await Promise.all(pokemonObjectFetch);
      const pokemonsToRender = newPokemonObjects.filter(isPokemonInfo);
      setPokemonObjects(pokemonsToRender);
    }
    loadPokemonObjects();
  }, [pokemons])

  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={{flex: 1}}
        data={pokemonObjects}
        renderItem={({ item }) => renderPokemon(item)}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={Map}
      />
    </View>
  );
}

const renderPokemon = (pokemonObject: PokemonInfo) => {
  return (
    <PokemonImage url={pokemonObject.url} name={pokemonObject.name} nameToRender={pokemonObject.name} />
  );
}

const renderSeparator = () => {
  return (
    <View style={styles.separator} />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: 250,
    backgroundColor: "#3337"
  },
  text: {
    margin: 50,
    fontSize: 40
  },
  container: {
    flex: 1,
  }
});