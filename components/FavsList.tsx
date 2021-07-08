import * as React from 'react';
import { View, FlatList, AsyncStorage, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import PokemonImage from './PokemonImage';
import {getPokemonInfo, getPokemonUrl, isPokemonInfo} from '../utlis/api'
import { PokemonInfo, PokemonJSONType } from '../types';
import { useEffect } from 'react';

type setPokemonsType = (pokemonInfo: PokemonInfo[]) => void;

export default function FavsList() {

  const [pokemons, setPokemons] = React.useState<ReadonlyArray<PokemonInfo>>([]);

  useEffect(() => {
    updateFavs(setPokemons);
  }, [])

  const onFindPress = () => {
    updateFavs(setPokemons);
  }

  return (
    <View>
      <TouchableOpacity
            onPress={onFindPress}>
        <Text >💙</Text>
      </TouchableOpacity>
      <FlatList
        data={pokemons}
        renderItem={(pokemon) => (<PokemonImage url={pokemon.item.url} name={pokemon.item.name} />)}
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


async function updateFavs(setPokemons: setPokemonsType) {
  const storageContent = await getAllFromStorage();
  if (storageContent != undefined) {
    const pokemonsJson = storageContent.map(getPokemonUrl)
    const pokemonsPromise = pokemonsJson.map(getPokemonInfo);
    const newPokemons = await Promise.all(pokemonsPromise);
    const favs = newPokemons.filter(isPokemonInfo);
    setPokemons(favs)
  }
}

async function getAllFromStorage() {
  try {
    return await AsyncStorage.getAllKeys();

  } catch (error) {
    console.error(error)
  }
}