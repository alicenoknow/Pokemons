import React from 'react';
import { useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { getPokemonDetails } from '../utlis/api';

interface PokemonDetailsProps {
    name: string;
}

interface PokemonDetails {
    type: string;
    imageUrl: string;
    baseExperience: number;
}

export default function PokemonDetails(props: PokemonDetailsProps) {

    const [details, setDetails] = useState<PokemonDetails>();
    useEffect(() => {
        async function setPokemonDetails() {
          const pokemonDetails = await getPokemonDetails(props.name);
          setDetails(pokemonDetails);
        }
        setPokemonDetails();
    }, [])

  return (
    <View style={styles.container}>
        <Image
          style={styles.pokemon}
          source={{ uri: details.imageUrl}}/>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.info}>Type: {details.type}</Text>
        <Text style={styles.info}>Base Experience: {details.baseExperience}</Text>
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
  info: {
    fontSize: 13,
    color: '#420'
  },
});

