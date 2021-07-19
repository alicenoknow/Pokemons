import * as React from 'react';
import { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import PokemonList from '../components/PokemonList';

export default function TabTwoScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <PokemonList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
