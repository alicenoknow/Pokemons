import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavContext } from './Favs';

interface FavButtonProps {
  name: string;
}

export default function FindPokemon(props: FavButtonProps) {

  const { addPokemon } = useFavContext();

  const onFindPress = () => {
    if (props.name) {
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
