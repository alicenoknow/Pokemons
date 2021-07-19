import { StyleSheet, Image, Animated, Easing } from 'react-native';
import React, { useRef } from 'react';

const pikachuImage = require('../assets/images/pik.png');

interface PikachuProps {
    rotation: number;
    scale: number;
}

export default function PikachuSprite(props: PikachuProps) {

    const scaleAnim = useRef(new Animated.Value(1)).current

    var spinValue = new Animated.Value(0);

    Animated.timing(
        spinValue,
    {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
    }
    ).start()

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
    

    return (
        <Animated.Image style={{...styles.img, transform: [{ rotate: spin }, { scaleX: props.scale }]}} source={pikachuImage} />
    );
}

const styles = StyleSheet.create({
    img: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
    }
});