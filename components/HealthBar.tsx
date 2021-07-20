import React, { useEffect, useRef, ReactElement } from 'react';
import { StyleSheet, Animated } from 'react-native';


export default function HealthBar(props: { health: number, maxHealth: number }): ReactElement {

  const widthValue = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.timing(
      widthValue,
      {
        toValue: props.health / props.maxHealth,
        duration: 700,
        useNativeDriver: false
      }).start()
    Animated.timing(
      colorValue,
      {
        toValue: props.health / props.maxHealth,
        duration: 700,
        useNativeDriver: false
      }).start()
  }, [props.health])

  const widthSpan = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%']
  })

  const colorSpan = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255,70,60)", "rgb(100,255,109)"]
  })

  return (
    <Animated.View style={{ width: widthSpan, backgroundColor: colorSpan, ...styles.health }}></Animated.View>
  );
}

const styles = StyleSheet.create({
  health: {
    height: 20,
    borderRadius: 10
  }
});
