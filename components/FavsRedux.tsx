import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'react-native';
import { updateStorage } from '../utlis/storage'

interface FavState {
    value: string[];
}

const initialState: FavState = {
    value: []
  }

export const favSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    initPokemons: (state, action: PayloadAction<string[]>) => {
        state.value = action.payload
    },
    addPokemon: (state, action: PayloadAction<string>) => {
        const pokemon = action.payload;

        if (state.value.includes(pokemon)) {
            Alert.alert(pokemon + ' already in your favs');
            return;
        }
        const newPokemons = [...state.value, pokemon];
        updateStorage(newPokemons);
        Alert.alert(pokemon + ' added to your favs');
        state.value = newPokemons;
    },
    removePokemon: (state, action: PayloadAction<string>) => {
        const pokemon = action.payload;

        if (state.value.includes(pokemon)) {
            const newPokemons = state.value.filter(p => p !== pokemon);
            updateStorage(newPokemons);
            Alert.alert(pokemon + ' removed from your favs');
            state.value = newPokemons;
          }
    },
  }
})

export const { addPokemon, removePokemon, initPokemons } = favSlice.actions

export default favSlice.reducer
