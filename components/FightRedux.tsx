import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FightingPokemon } from '../types';

interface FightState {
    pokemons: FightingPokemon[]
}

const emptyPoke: FightingPokemon = {
  name: "",
  prevHealth: 0, 
  health: 0, 
  maxHealth: 1,
  types: [],
  attacks: {
    special: [{damage: 0,name: ""}, {damage: 0,name: ""}],
    fast: [{damage: 0, name: ""},{damage: 0, name: ""}]
  }
}

const initialState: FightState = {
    pokemons: [emptyPoke, emptyPoke]
  }

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<{pokemon: FightingPokemon, index: number}>) => {
        state.pokemons[action.payload.index] = action.payload.pokemon;
    },
    
    increaseHealth: (state, action: PayloadAction<{index: number}>) => {
      if (state.pokemons[action.payload.index].health+10 <= state.pokemons[action.payload.index].maxHealth){
          state.pokemons[action.payload.index].health+=10;
      }
      else {
        state.pokemons[action.payload.index].health=state.pokemons[action.payload.index].maxHealth;
      }
    },
    decreaseHealth: (state, action: PayloadAction<{index: number, value: number}>) => {
      if (state.pokemons[action.payload.index].health-action.payload.value >= 0) {
          state.pokemons[action.payload.index].health-=action.payload.value;
      }
      else {
        state.pokemons[action.payload.index].health=0;
      }
    } 
  }
})

export const { setPokemon, increaseHealth, decreaseHealth } = fightSlice.actions

export default fightSlice.reducer
