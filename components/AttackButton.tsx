import React from 'react';

import { ReactElement } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../utlis/store';
import { TypeColor } from '../utlis/pokemonTypes';
import { fightSlice } from './FightRedux';
import { useNavigation } from '@react-navigation/native';

export default function Attack(props: { attack: string, damage: number, types: string[], index: number }): ReactElement {
    const dispatch = useAppDispatch();
    const fight = useAppSelector(state => state.fighters);
    const navigation = useNavigation();
    const opacity = fight.attack.isAttack ? 0.4 : 1;

    const sendDispatch = () => {
        const attackedIndex = (props.index + 1) % 2;
        dispatch(fightSlice.actions.decreaseHealth({ index: attackedIndex, value: props.damage }));
        if (fight.pokemons[attackedIndex].health - props.damage <= 0) {
            navigation.navigate('GameOverScreen', { winner: fight.pokemons[(attackedIndex + 1) % 2].name, loser: fight.pokemons[attackedIndex].name });
        }
    }
    return (

        <TouchableOpacity disabled={fight.attack.isAttack} style={{ ...styles.button, opacity: opacity, backgroundColor: TypeColor[props.types[0]].color }}
            onPress={sendDispatch}>
            <Text style={styles.text}>{props.attack}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        borderRadius: 13
    },
    text: {
        fontSize: 15,
        textAlign: 'center'
    }
});
