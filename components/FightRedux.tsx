import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FightingPokemon } from '../types';

interface FightState {
  pokemons: FightingPokemon[],
  attack: { isAttack: boolean, attacker: number };
}

const emptyPoke: FightingPokemon = {
  name: "",
  prevHealth: 0,
  health: 0,
  maxHealth: 1,
  types: ["default"],
  attacks: {
    special: [{ damage: 0, name: "" }, { damage: 0, name: "" }],
    fast: [{ damage: 0, name: "" }, { damage: 0, name: "" }]
  }
}

const initialState: FightState = {
  pokemons: [emptyPoke, emptyPoke],
  attack: { isAttack: false, attacker: 0 }
}

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<{ pokemon: FightingPokemon, index: number }>) => {
      state.pokemons[action.payload.index] = action.payload.pokemon;
    },

    endAttack: (state) => {
      state.attack.isAttack = false;
    },
    decreaseHealth: (state, action: PayloadAction<{ index: number, value: number }>) => {
      const index = action.payload.index;
      if (state.pokemons[index].health - action.payload.value >= 0) {
        state.pokemons[index].health -= action.payload.value;
      }
      else {
        state.pokemons[index].health = 0;
      }
      state.attack.isAttack = true;
      state.attack.attacker = (index + 1) % 2;
    }
  }
})

export const { setPokemon, endAttack, decreaseHealth } = fightSlice.actions

export default fightSlice.reducer
