import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import FindPokemon from '../components/FindPokemon';
import PokemonImage from '../components/PokemonImage';
import FavButton from '../components/FavButton';
import Title from '../components/Title';
import { downloadPokemonImage } from '../network/api'


export default function TabOneScreen() {

  const[url, setImageUrl] = React.useState('https://reactnative.dev/img/tiny_logo.png')
  const[name, setName] = React.useState('')


  return (
    <View style={styles.containerMain}>
      <View style={styles.containerFav}>
        <FavButton name={name}/>
      </View>
      
      <View style={styles.container}>      
        <Title text="Find Pokemon "/>
        <View style={styles.separator}/>
        <FindPokemon onFindPress={downloadPokemonImage} onChangeUrl={setImageUrl} onNameChange={setName}/>
        <PokemonImage url={url} />
      </View>
    </View>
 );
}


const styles = StyleSheet.create({
  containerMain: {
    flex:1,
    justifyContent: 'center',
    margin: 15
  },

  containerFav: {
    flex: 0,
    margin: 10,
    alignItems: 'flex-end',
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

