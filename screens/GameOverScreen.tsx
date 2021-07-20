import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ReactElement } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { Papaj } from '../utlis/requires';

interface GameOverScreenProps {
    route: RouteProp<{ params: { winner: string, loser: string } }, 'params'>;
}

export default function GameOverScreen(props: GameOverScreenProps): ReactElement {

    const { winner, loser } = props.route.params;
    const spinVal = useRef(new Animated.Value(0)).current;
    const yScaleVal = useRef(new Animated.Value(0)).current;
    const xScaleVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                spinVal,
                {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: false
                }),
            Animated.timing(
                xScaleVal,
                {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: false
                }),
            Animated.timing(
                yScaleVal,
                {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: false
                }),
        ]).start()
    }, []);

    const spin = spinVal.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const xScale = xScaleVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const yScale = yScaleVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })


    return (
        <View style={styles.containerMain}>
            <Animated.Image style={{ transform: [{ rotate: spin }, { scaleX: xScale }, { scaleY: yScale }], ...styles.img }} source={Papaj} />
            <Text style={styles.text}>{winner} wins, {loser} loses!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40
    },
    img: {
        width: 350,
        height: 350,
    }
});

