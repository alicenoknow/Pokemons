import React from 'react';

import { ReactElement } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { useAppSelector } from '../utlis/store';


export default function HealthBar(props: {health: number, maxHealth: number}): ReactElement {

  const fighters = useAppSelector(state => state.fighters);
  const widthValue = new Animated.Value(0);

  Animated.timing(
    widthValue,
    {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
    }
    ).start()

const span = widthValue.interpolate({
inputRange: [0, 1],
outputRange: [(props.health * 60 / props.maxHealth) + '%' , (props.health * 80 / props.maxHealth) + '%']
})

  return (
        <Animated.View style={{width: span,  ...styles.health}}></Animated.View>
  );
}

const styles = StyleSheet.create({
  health: {
    backgroundColor: '#00cc00', 
    height: 20,
    borderRadius: 10
  }
});
