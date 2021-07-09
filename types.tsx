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