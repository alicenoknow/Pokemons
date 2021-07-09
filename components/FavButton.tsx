import * as React from 'react';
import { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { addToStorage, initialStorage } from '../utlis/storage'
import { useFavContext } from './Favs';

interface FavButtonProps {
  name: string;
}

export default function FindPokemon(props: FavButtonProps) {

  const { pokemons, addPokemon } = useFavContext();

  const onFindPress = async () => {
    if (props.name){ 
      const key = props.name.toLowerCase();
      addPokemon(key);
    }
  }

    return (
          <TouchableOpacity
              style={styles.button}
              onPress={onFindPress}>
            <Text style={styles.button}>💙</Text>
          </TouchableOpacity>
    );
  }
 
  const styles = StyleSheet.create({
    button: {
      fontSize: 40,
      padding: 2,
    },
  });
