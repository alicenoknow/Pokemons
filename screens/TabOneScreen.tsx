import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import FindPokemon from '../components/FindPokemon';
import PokemonImage from '../components/PokemonImage';
import {getPokemonImageUrl } from '../utlis/api'

export default function TabOneScreen() {

  const[url, setImageUrl] = React.useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png')
  const[name, setName] = React.useState('')


  return (

    <View style={styles.containerMain}>      
        <FindPokemon onFindPress={getPokemonImageUrl} onChangeUrl={setImageUrl} onNameChange={setName}/>
        <PokemonImage url={url} name={name.toLowerCase()} />
    </View>
 );
}


const styles = StyleSheet.create({
  containerMain: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
});

