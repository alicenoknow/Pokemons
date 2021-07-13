import { StyleSheet, Image } from 'react-native';
import React from 'react';


const pikachuImage = require('../assets/images/pik.png');

interface PikachuProps {
    rotation: number;
    scale: number;
}

export default function PikachuSprite(props: PikachuProps) {
    const styles = StyleSheet.create({
        img: {
            width: 110,
            height: 110,
            resizeMode: 'contain',
            transform: [{ rotate: props.rotation+'deg'},{scaleX: props.scale}],
        }
    
    });

    return (
        <Image style={styles.img} source={pikachuImage} />
    );
}
