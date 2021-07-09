import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PokemonDetails from '../components/PokemonDetails';
import { NavigatorScreenParams } from '@react-navigation/native';

// TODO types https://reactnavigation.org/docs/typescript
export default function DetailsScreen({ route }: any) {
    if (route.params.name)
        return ( 
            <View style={styles.containerMain}>
                <PokemonDetails name={route.params.name}/>
            </View>
            );
    else {
        return (<Text style={styles.text}>ajaj</Text>);
    }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    margin: 15
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  }
});

