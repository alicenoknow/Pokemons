import * as React from 'react';
import { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { State } from 'react-native-gesture-handler';
import store, { useAppDispatch, useAppSelector } from '../utlis/store';
import { useFavContext } from './FavsContext';
import { favSlice } from './FavsRedux';

interface FavButtonProps {
  name: string;
}

export default function FindPokemon(props: FavButtonProps) {

  // const { pokemons, addPokemon, removePokemon } = useFavContext();
  const pokemons = useAppSelector(state => state.pokemons.value);
  const dispatch = useAppDispatch()

  const onFindPressAdd = () => {
      const key = props.name.toLowerCase();
      // addPokemon(key);
      dispatch(favSlice.actions.addPokemon(key))
  }

  const onFindPressRemove = () => {
      const key = props.name.toLowerCase();
      // removePokemon(key);
      dispatch(favSlice.actions.removePokemon(key))
  }

  const inFavs = (name: string) => {
    // return pokemons.includes(name.toLowerCase());
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
