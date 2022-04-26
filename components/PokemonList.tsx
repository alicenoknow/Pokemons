import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PokemonImage from "./PokemonImage";
import { loadPokemonBatch } from "../utils/api";
import { PokemonInfo } from "../types";
import { ReactElement } from "react";

export default function PokemonList(): ReactElement {
  const [url, setUrl] = React.useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  const [pokemons, setPokemons] = React.useState<ReadonlyArray<PokemonInfo>>(
    []
  );
  const addPokemons = (newPokemons: ReadonlyArray<PokemonInfo>) => {
    setPokemons([...pokemons, ...newPokemons]);
  };

  React.useEffect(() => {
    loadPokemonBatch(addPokemons, url, setUrl);
  }, []);

  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => renderPokemon(item)}
      onEndReachedThreshold={4}
      onEndReached={() => loadPokemonBatch(addPokemons, url, setUrl)}
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}

const renderPokemon = (pokemonObject: PokemonInfo) => {
  return (
    <PokemonImage
      url={pokemonObject.url}
      name={pokemonObject.name}
      nameToRender={pokemonObject.name}
    />
  );
};

const renderSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  pokemon: {
    margin: 10,
    width: 200,
    height: 200,
    resizeMode: "center",
  },
  separator: {
    height: 1,
    width: 250,
    backgroundColor: "#3337",
  },
});
