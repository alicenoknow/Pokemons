import * as React from 'react';
import { View, FlatList } from 'react-native';
import PokemonImage from './PokemonImage';
import { getPokmeonInfoFromName, isPokemonInfo } from '../utlis/api'
import { PokemonInfo } from '../types';
import { useEffect } from 'react';
import { useFavContext } from './Favs';
import { useState } from 'react';

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
    <View>
      <FlatList
        data={pokemonObjects}
        renderItem={({ item }) => renderPokemon(item)}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

const renderPokemon = (pokemonObject: PokemonInfo) => {
  return <PokemonImage url={pokemonObject.url} name={pokemonObject.name} />
}