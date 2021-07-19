import React from 'react';

import { ReactElement } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '../utlis/store';
import { fightSlice } from './FightRedux';

export default function ChangeLife(props: {symbol: string, index: number, color: string}): ReactElement {
    const dispatch = useAppDispatch();

    const sendDispatch = () => {
        if(props.symbol == "+") {
            dispatch(fightSlice.actions.increaseHealth({index: props.index}));
        }
        else {
            dispatch(fightSlice.actions.decreaseHealth({index: props.index}));
        }
    }

    return (
            <TouchableOpacity style={{ ...styles.button, backgroundColor: props.color}}
                onPress={sendDispatch}>
                <Text style={styles.text}>{props.symbol}</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        borderRadius: 30
    },
    text: {
         fontSize: 30,
    }
  });
