import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FightState {
    pokemons: FightingPokemon[]
}

interface FightingPokemon {
    name: string,
    health: number,
    maxHealth: number;
}

const initialState: FightState = {
    pokemons: [{name: "", health: 0, maxHealth: 1}, {name: "", health: 0, maxHealth: 1}]
  }

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<{pokemon: FightingPokemon, index: number}>) => {
      console.log("sssssss ", action.payload.pokemon.maxHealth)
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
    decreaseHealth: (state, action: PayloadAction<{index: number}>) => {
      if (state.pokemons[action.payload.index].health-10 >= 0) {
          state.pokemons[action.payload.index].health-=10;
      }
      else {
        state.pokemons[action.payload.index].health=0;
      }
    } 
  }
})

export const { setPokemon, increaseHealth, decreaseHealth } = fightSlice.actions

export default fightSlice.reducer
