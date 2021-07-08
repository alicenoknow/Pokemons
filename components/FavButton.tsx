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
      addToStorage(key, key);
      console.log("aaa " + pokemons)
    }
  }

    return (
        <React.Fragment>
          <TouchableOpacity
              style={styles.button}
              onPress={onFindPress}>
            <Text style={styles.button}>💙</Text>
          </TouchableOpacity>
        </React.Fragment>
    );
  }
 
  const styles = StyleSheet.create({
    button: {
      fontSize: 40,
      padding: 2,
      width: '40%',
    },
  });
