import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import FavButton from '../components/FavButton';
import FindPokemon from '../components/FindPokemon';
import PokemonImage from '../components/PokemonImage';
import {getPokemonImageUrl } from '../utlis/api'

export default function TabOneScreen() {

  const[url, setImageUrl] = React.useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png')
  const[name, setName] = React.useState('')
  const[clicked, setClicked] = React.useState(false)

  return (
    <>
    <View style={styles.containerFav}>    
        <FavButton name={name.toLowerCase()}/>
    </View>
    <View style={styles.containerMain}>
      <FindPokemon onFindPress={getPokemonImageUrl} onChangeUrl={setImageUrl} onNameChange={setName} setClick={setClicked}/>
      <PokemonImage url={url} name={name.toLowerCase()} clicked={clicked} setClick={setClicked}/>
    </View>
    </>
 );
}

const styles = StyleSheet.create({
  containerMain: {  
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  containerFav: {
    flex: 0,
    margin: 50,
    alignItems: 'flex-end'
  },
  
});

