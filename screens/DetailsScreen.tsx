import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PokemonDetails from '../components/PokemonDetails';

export default function DetailsScreen() {

  return (
    <View style={styles.containerMain}>
      <Text>twojastaratokopara</Text>
      {/* <PokemonDetails name='pikachu'/> */}
    </View>
 );
}


const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
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

