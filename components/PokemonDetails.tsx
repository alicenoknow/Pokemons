import React from 'react';
import { useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemonDetails } from '../utlis/api';
import FavButton from './FavButton';
import { PokemonDetailsType } from '../types'

interface PokemonDetailsProps {
    name: string;
}

export default function PokemonDetails(props: PokemonDetailsProps) {

    const [details, setDetails] = useState<PokemonDetailsType | null>(null);

    useEffect(() => {
        async function setPokemonDetails() {
        //   await new Promise(resolve => setTimeout(resolve, 3000)); // czekanie N sekund
          const pokemonDetails = await getPokemonDetails(props.name);
          if (pokemonDetails !== undefined){
            setDetails(pokemonDetails);
          }
        }
        if (props.name){
            setPokemonDetails();
        }
    }, [])

  if (details === null) {
    return <View><ActivityIndicator/></View>
  }

  return (
    <View style={styles.container}>
        <FavButton name={props.name}/>
        <Image
          style={styles.pokemon}
          source={{ uri: details.url}}/>
        <Text style={styles.name}>{props.name}</Text>
        <View>
            <Text style={styles.info}>Type: {details.type}</Text>
            <Text style={styles.info}>Base experience: {details.baseExperience}</Text>
        </View>
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
    color: '#420',
    marginBottom: 10
  },
  info: {
    fontSize: 13,
    color: '#420'
  },
});

