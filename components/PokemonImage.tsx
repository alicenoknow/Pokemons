import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

interface PokemonImageProps {
    url: string;
    name?: string;
  }  

export default function PokemonImage(props: PokemonImageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.separator}/>
      <Text style={styles.name}>{props.name}</Text>
      <Image 
      style={styles.pokemon}
      source={{uri: props.url}}/>
    </View>); 
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    pokemon: {
      width: 180,
      height: 180,
    },
    name: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#420'
    },
    separator: {
      marginVertical: 20,
      height: 1,
      width: '100%',
      backgroundColor: "#420"
    }

  });

