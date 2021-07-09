import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface PokemonImageProps {
  url: string;
  name: string;
}

export default function PokemonImage(props: PokemonImageProps) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => navigation.navigate('DetailsScreen')}>
        <View style={styles.separator} />
        <Text style={styles.name}>{props.name}</Text>
        <Image
          style={styles.pokemon}
          source={{ uri: props.url }} />
     </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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

