import * as React from 'react';
import { ReactElement, useCallback } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../utlis/store';
import { fightSlice } from './FightRedux';
import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';


interface PokemonImageProps {
  url: string;
  name: string;
  index: number;
  nameToRender?: string;
}

export default function PokemonChoiceImage(props: PokemonImageProps): ReactElement {
  
  const { name, url, index, nameToRender } = props;
  const dispatch = useAppDispatch()
  const { loading, error, data } = useQuery(pokemonQuery, { variables: { name }});
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    console.log(loading, error, data)
    if (data) {
      const pokemonHealth = data.pokemon.maxHP;
      dispatch(fightSlice.actions.setPokemon({pokemon: {name: props.name, health: pokemonHealth, maxHealth: pokemonHealth}, index: index}));
      navigation.navigate('TabFourScreen', {});
    }
    
  }, [props.name])

    return (
        <TouchableOpacity
        onPress={onPress}>
        <Text style={styles.name}>{nameToRender}</Text>
        <Image
            style={styles.pokemon}
            source={{ uri: url }} />
        </TouchableOpacity>);
}


const pokemonQuery = gql`
    query Pokemon($name:String) {
        pokemon: pokemon(name: $name) {
            maxHP
        }
    }`

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center'
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
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});

