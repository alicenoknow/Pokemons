import React, { useEffect, useState } from "react";

import { ReactElement } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getPokemonDetails } from "../utils/api";
import { useAppSelector } from "../utils/store";
import ChangeButton from "./ChangeButton";
import Attack from "./AttackButton";
import HealthBar from "./HealthBar";
import PokemonImage from "./PokemonImage";

export default function FightingPokemon(props: {
  index: number;
}): ReactElement {
  const fighters = useAppSelector((state) => state.fighters);
  const { name, health, maxHealth, attacks, types } =
    fighters.pokemons[props.index];
  const [url, setUrl] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png"
  );

  useEffect(() => {
    async function getUrl() {
      if (name) {
        const pokemonInfo = await getPokemonDetails(name);
        if (pokemonInfo !== undefined) {
          setUrl(pokemonInfo.url);
        }
      }
    }
    getUrl();
  }, [fighters.pokemons]);

  const getSpecial = (index: number) => {
    if (attacks.special.length >= index + 1) {
      return (
        <Attack
          index={props.index}
          attack={attacks.special[index].name}
          damage={attacks.special[index].damage}
          types={types}
        />
      );
    }
  };
  const getFast = (index: number) => {
    if (attacks.fast.length >= index + 1) {
      return (
        <Attack
          index={props.index}
          attack={attacks.fast[index].name}
          damage={attacks.fast[index].damage}
          types={types}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <ChangeButton index={props.index} />
      <View style={styles.plusMinus}>
        {getSpecial(0)}
        {getSpecial(1)}
        {getFast(0)}
        {getFast(1)}
      </View>
      <View style={styles.health}>
        <HealthBar health={health} maxHealth={maxHealth} />
        <Text> {health}</Text>
      </View>
      <PokemonImage name={name} url={url} nameToRender={name} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: "center",
    justifyContent: "center",
  },
  health: {
    flexDirection: "row",
    margin: 5,
  },
  plusMinus: {
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
