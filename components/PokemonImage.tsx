import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useCallback } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FavButton from './FavButton';

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}>
        <View style={styles.upperContainer}>
          <Text style={styles.name}>{props.nameToRender}</Text>
          <FavButton name={props.name}/>
        </View>
        <Image
          style={styles.pokemon}
          source={{ uri: props.url }} />
     </TouchableOpacity>
    </View>);
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
  }

});

