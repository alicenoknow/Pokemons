import * as React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PokemonImage from './PokemonImage';
import {getPokemonInfo, getPokemonUrl, getPokmeonInfoFromName, isPokemonInfo} from '../utlis/api'
import { getAllFromStorage } from '../utlis/storage';
import { PokemonInfo } from '../types';
import { useEffect } from 'react';
import { useFavContext } from './Favs';
import { useState } from 'react';

type setPokemonsType = (pokemonInfo: PokemonInfo[]) => void;

function filterUndefinedPokemonObjects(pokemonObject: PokemonInfo | undefined): pokemonObject is PokemonInfo {
  return pokemonObject !== undefined;
}

export default function FavsList() {
  const [pokemonObjects, setPokemonObjects] = useState<PokemonInfo[]>([]);

  const { pokemons, addPokemon } = useFavContext();

  useEffect(() => {
    async function loadPokemonObjects() {
      const pokemonObjectFetch = pokemons.map(getPokmeonInfoFromName);
      const newPokemonObjects = await Promise.all(pokemonObjectFetch);
      const pokemonsToRender = newPokemonObjects.filter(filterUndefinedPokemonObjects);
      setPokemonObjects(pokemonsToRender);
    }
    loadPokemonObjects();
  }, [pokemons])

  return (
      <View>
        <FlatList
          data={pokemonObjects}
          renderItem={({item}) => renderPokemon(item)}
          keyExtractor={item => item.name}
        />
      </View>
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

const renderPokemon = (pokemonObject: PokemonInfo) => {
    return <PokemonImage url={pokemonObject.url} name={pokemonObject.name} />
}