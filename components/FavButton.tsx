import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavContext } from './Favs';

interface FavButtonProps {
  name: string;
}

export default function FindPokemon(props: FavButtonProps) {

  const { pokemons, addPokemon, removePokemon } = useFavContext();

  const onFindPressAdd = () => {
      const key = props.name.toLowerCase();
      addPokemon(key);
  }

  const onFindPressRemove = () => {
      const key = props.name.toLowerCase();
      removePokemon(key);
  }

  const inFavs = (name: string) => {
    return pokemons.includes(name.toLowerCase());
  }

  const AddOrRemove = inFavs(props.name);
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={AddOrRemove ? onFindPressRemove : onFindPressAdd}>
        <Text style={styles.button}>{AddOrRemove ? '💔 ': '❤️'}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    padding: 2,
  },
});
