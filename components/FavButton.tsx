import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavContext } from './Favs';

interface FavButtonProps {
  name: string;
}

export default function FindPokemon(props: FavButtonProps) {

  const { pokemons, addPokemon, removePokemon } = useFavContext();

  const onFindPressAdd = () => {
    if (props.name) {
      const key = props.name.toLowerCase();
      addPokemon(key);
    }
  }

  const onFindPressRemove = () => {
    if (props.name) {
      const key = props.name.toLowerCase();
      removePokemon(key);
    }
  }

  function inFavs(name: string) {
    return pokemons.includes(name.toLowerCase());
  }

  if (inFavs(props.name)) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onFindPressRemove}>
        <Text style={styles.button}>💔</Text>
      </TouchableOpacity>
    );
  }
  else {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onFindPressAdd}>
        <Text style={styles.button}>❤️</Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    padding: 2,
  },
});
