import React from 'react';

import { ReactElement } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '../utlis/store';
import { TypeColor } from '../utlis/typesColor';
import { fightSlice } from './FightRedux';

export default function Attack(props: {attack:string, damage:number, types:string[], index: number}): ReactElement {
    const dispatch = useAppDispatch();

    const sendDispatch = () => {
        dispatch(fightSlice.actions.decreaseHealth({index: (props.index + 1) % 2, value: props.damage}));
    }

    return (
            <TouchableOpacity style={{ ...styles.button, backgroundColor: TypeColor[props.types[0]]}}
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
    }
  });
