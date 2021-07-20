import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PokemonImage from './PokemonImage';
import { getPokmeonInfoFromName, isPokemonInfo } from '../utlis/api'
import { PokemonInfo } from '../types';
import { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import Map from './Map';
import { useAppDispatch, useAppSelector } from '../utlis/store';
import { initialStorage } from '../utlis/storage';
import { favSlice } from './FavsRedux';

export default function FavsList(): ReactElement {

  const [pokemonObjects, setPokemonObjects] = useState<PokemonInfo[]>([]);

  // Context
  // const { pokemons } = useFavContext();

  // Redux
  const pokemons = useAppSelector(state => state.pokemons.value);
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function loadPokemonObjects() {
      const pokemonObjectFetch = pokemons.map(getPokmeonInfoFromName);
      const newPokemonObjects = await Promise.all(pokemonObjectFetch);
      const pokemonsToRender = newPokemonObjects.filter(isPokemonInfo);
      setPokemonObjects(pokemonsToRender);
    }
    loadPokemonObjects();
  }, [pokemons])

  useEffect(() => {
    async function initPokemons() {
      const pokemonInitial = await initialStorage();
      dispatch(favSlice.actions.initPokemons(pokemonInitial));
    }
    initPokemons();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
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
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    margin: 50,
    fontSize: 40
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignContent: 'center',
  }
});