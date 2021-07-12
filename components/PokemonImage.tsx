import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useCallback } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PokemonAnimation from './Animation';

interface PokemonImageProps {
  url: string;
  name: string;
  nameToRender?: string;
}

export default function PokemonImage(props: PokemonImageProps) {

  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('DetailsScreen', {name: props.name});
  }, [props.name])

  if (props.url !== "") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}>
          <Text style={styles.name}>{props.nameToRender}</Text>
          <Image
            style={styles.pokemon}
            source={{ uri: props.url }} />
       </TouchableOpacity>
      </View>);
  }
  else {
    return (
      <>
        <View style={styles.animationContainer}>
          <PokemonAnimation source={require('../assets/animations/squirtle.json')} />
          <PokemonAnimation source={require('../assets/animations/diglett.json')} speed={2.307}/>
        </View>
        <Text>Pokemon {props.name} does not exist :c</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20
  },
  pokemon: {
    width: 180,
    height: 180,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420', 
    margin: 15,
  },
  separator: {
    height: 1,
    width: 250,
    backgroundColor: "#3337"
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20
  }

});

