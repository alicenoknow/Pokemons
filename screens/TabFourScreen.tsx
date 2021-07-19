import * as React from 'react';
import { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import FightingPokemon from '../components/FightingPokemon';

export default function TabFourScreen(): ReactElement {

  return (
    <View style={styles.containerMain}>
        <FightingPokemon index={0} />
        <View style={styles.separator}/>
        <FightingPokemon index={1} />
    </View>
 );
}

const styles = StyleSheet.create({
  containerMain: {  
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  separator: {
    height: 1,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto', 
    backgroundColor: "#0007"
  },
});

