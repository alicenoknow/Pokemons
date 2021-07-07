import * as React from 'react';

import FindPokemon from '../components/FindPokemon';
import PokemonImage from '../components/PokemonImage';
import FavButton from '../components/FavButton';
import Title from '../components/Title';

import { View, StyleSheet } from 'react-native';

async function downloadPokemonImage(pokemonName: string, imageUrlCallback: (pokemonImageUrl: string) => void) {
  try {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase());
  const responseJson = await response.json();
  imageUrlCallback(responseJson.sprites.front_default);
  } catch (error) {
    console.log(error);
  }
}


export default function TabOneScreen() {

  const[url, setImageUrl] = React.useState('https://reactnative.dev/img/tiny_logo.png')
  const[name, setName] = React.useState('')


  return (
    <View style={styles.containerMain}>
      <View style={styles.containerFav}>
        <FavButton/>
      </View>
      
      <View style={styles.container}>      
        <Title text="Find Pokemon "/>
        <View style={styles.separator}/>
        <FindPokemon onFindPress={downloadPokemonImage} onChangeUrl={setImageUrl}/>
        <PokemonImage url={url} />
      </View>
    </View>
 );
}


const styles = StyleSheet.create({
  containerMain: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },

  containerFav: {
    flex: 0,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
});

