import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

type imageUrlCallback = (pokemonImageUrl: string) => void;

interface FindButtonProps {
  onFindPress: (text: string, setter: imageUrlCallback) => void;
  onChangeUrl: imageUrlCallback
}

export default function FindPokemon() {

  const [text, setText] = React.useState('');
  const onFindPress = () => {
   
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={onFindPress}>
        <Text style={styles.button}>💙</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row"
    },
    button: {
      fontSize: 30,
      backgroundColor: '#faf',
      padding: 2,
      width: '30%',
      alignItems: 'center',
      borderRadius: 5
    },
  });

