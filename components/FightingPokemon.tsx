import React, { useEffect, useState } from 'react';

import { ReactElement } from 'react';
import { View,  StyleSheet, Text } from 'react-native';
import { getPokemonDetails } from '../utlis/api';
import { useAppSelector } from '../utlis/store';
import ChangeButton from './ChangeButton';
import ChangeLife from './ChangeLife';
import HealthBar from './HealthBar';
import PokemonImage from './PokemonImage';



export default function FightingPokemon(props: {index: number}): ReactElement {

    const fighters = useAppSelector(state => state.fighters);
    const { name, health, maxHealth } = fighters.pokemons[props.index]
    const [url, setUrl] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png');

    useEffect(() => {
    async function getUrl() {
        if (name){
            const pokemonInfo = await getPokemonDetails(name);
            if (pokemonInfo !== undefined) {
                setUrl(pokemonInfo.url);
            }
        }   
    }
    getUrl();
    }, [fighters]);

  return (
      <View style={styles.container}>
          <ChangeButton index={props.index} />
          <View style={styles.plusMinus}>
            <ChangeLife symbol="+" index={props.index} color="#7f5c" />
            <ChangeLife symbol="-" index={props.index} color="#ff3300" />
          </View>
          <View style={styles.health}>
            <HealthBar health={health} maxHealth={maxHealth} />
            <Text> {health}</Text>
          </View>
          <PokemonImage name={name} url={url} nameToRender={name}/>
      </View>
  );
}

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    health: {
      flexDirection: 'row',
      margin: 5,
    },
    plusMinus: {
        flexDirection: 'row'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    }
  });
