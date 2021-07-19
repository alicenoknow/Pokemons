
import { useNavigation } from '@react-navigation/native';
import React,  { ReactElement, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function ChangePokemon(props: {index: number}): ReactElement {
    const navigation = useNavigation();

    const onPress = useCallback(() => {
        navigation.navigate('ChoiceScreen', { index: props.index });
      }, [props.index])

    return (
            <TouchableOpacity style={styles.button}
                onPress={onPress}>
                <Text style={styles.text}>Change pokemon</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 200,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#acf',
        margin: 4,
        borderRadius: 10
    },
    text: {
         fontSize: 20,
    }
  });
