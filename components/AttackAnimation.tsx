import React, { useEffect, useRef, ReactElement } from "react";
import { StyleSheet, Animated, ImageRequireSource } from "react-native";
import { TypeColor } from "../utils/pokemonTypes";
import { useAppDispatch, useAppSelector } from "../utils/store";
import { fightSlice } from "./FightRedux";

export default function AttackAnimation(): ReactElement {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const yValue = useRef(new Animated.Value(0)).current;
  const fighters = useAppSelector((state) => state.fighters);
  const dispatch = useAppDispatch();
  const { isAttack, attacker } = fighters.attack;

  const type = fighters.pokemons[attacker].types[0];
  const from = attacker == 0 ? 0 : 1;
  const to = attacker == 0 ? 1 : 0;
  const url: ImageRequireSource = TypeColor[type].url;

  useEffect(() => {
    if (isAttack) {
      Animated.sequence([
        Animated.timing(yValue, {
          toValue: from,
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(yValue, {
          toValue: to,
          velocity: 2,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        dispatch(fightSlice.actions.endAttack());
      });
    }
  }, [fighters.attack.isAttack]);

  const ySpan = yValue.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 600],
  });

  const opacitySpan = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.Image
      source={url}
      style={{
        opacity: opacitySpan,
        transform: [{ translateY: ySpan }],
        ...styles.img,
      }}
    ></Animated.Image>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 80,
    position: "absolute",
    top: 0,
    left: 175,
  },
});
