/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Find: undefined;
  Browse: undefined;
  Favs: undefined;
  Fight: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  DetailsScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  DetailsScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
  DetailsScreen: undefined;
};

export type TabFourParamList = {
  TabFourScreen: undefined;
  ChoiceScreen: undefined;
  DetailsScreen: undefined;
  GameOverScreen: undefined;
};

export interface PokemonJSONType {
  url: string;
  name?: string;
  sprites?: {
    front_default: string;
  }
}

export interface PokemonInfo {
  url: string;
  name: string;
}

export interface PokemonDetailsType {
  url: string;
  type: string;
  baseExperience: number;
}

export interface FightingPokemon {
  name: string,
  prevHealth: number;
  health: number,
  maxHealth: number,
  types: string[],
  attacks: {
    special: { damage: number, name: string; }[],
    fast: { damage: number, name: string; }[]
  }
}