import React from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import FavButton from './FavButton';
import { gql, useQuery } from '@apollo/client';
import { ReactElement } from 'react';

interface PokemonDetailsProps {
  name: string;
}

const pokemonQuery = gql`
          query Pokemon($name:String) {
              pokemon: pokemon(name: $name) {
                  name
                  weight {
                      minimum
                      maximum
                    }
                    height {
                      minimum
                      maximum
                    }
                    classification
                    types
                    image
                    weaknesses
                }
              }`

export default function PokemonDetails(props: PokemonDetailsProps): ReactElement {

  const { name } = props;
  const { loading, error, data } = useQuery(pokemonQuery, { variables: { name }, fetchPolicy: "cache-first" });

  // REST API
  // const [details, setDetails] = useState<PokemonDetailsType | null>(null);
  // useEffect(() => {
  //     async function setPokemonDetails() {
  //     //   await new Promise(resolve => setTimeout(resolve, 3000)); // czekanie N sekund
  //       const pokemonDetails = await getPokemonDetails(props.name);
  //       if (pokemonDetails !== undefined){
  //         setDetails(pokemonDetails);
  //       }
  //     }
  //     if (props.name){
  //         setPokemonDetails();
  //     }
  // }, [])

  if (loading) {
    return <View><ActivityIndicator /></View>
  }

  if (error) {
    return (
      <Text>ajaj {error.message}</Text>
    );
  }
  return (
    <View style={styles.container}>
      <FavButton name={name} />
      <Image
        style={styles.pokemon}
        source={{ uri: data.pokemon.image }} />
      <Text style={styles.name}>{data.pokemon.name}</Text>
      <View>
        <Text style={styles.info}>Types: {data.pokemon.types.join(", ")}</Text>
        <Text style={styles.info}>Classification: {data.pokemon.classification}</Text>
        <Text style={styles.info}>Weaknesses: {data.pokemon.weaknesses.join(", ")}</Text>
        <Text style={styles.info}>Weight: from {data.pokemon.weight.minimum} to {data.pokemon.weight.maximum}</Text>
        <Text style={styles.info}>Height: from {data.pokemon.height.minimum} to {data.pokemon.height.maximum}</Text>

      </View>
    </View>);
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pokemon: {
    width: 200,
    height: 200,
    resizeMode: 'center',
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 15,
    borderColor: '#acf'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#420',
    marginBottom: 10
  },
  info: {
    fontSize: 18,
    color: '#420',
    margin: 3
  },
});
