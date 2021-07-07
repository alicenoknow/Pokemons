import * as React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

type imageUrlCallback = (pokemonImageUrl: string) => void;

interface FindButtonProps {
  onFindPress: (text: string, setter: imageUrlCallback) => void;
  onChangeUrl: imageUrlCallback
}

export default function FindPokemon(props: FindButtonProps) {

  const [text, setText] = React.useState('');
  const onFindPress = () => {
    props.onFindPress(text, props.onChangeUrl);
  }

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          placeholder="Type name" 
          onChangeText={setText}
          value={text}
        ></TextInput>
        <TouchableOpacity
            style={styles.button}
            onPress={onFindPress}>
            <Text>Find</Text>
          </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row"
    },
    input: {
      width: '40%',
      color: '#faf',
      padding: 10
    },
    button: {
      fontSize: 10,
      backgroundColor: '#faf',
      padding: 10,
      marginLeft: 20,
      width: '30%',
      alignItems: 'center',
      borderRadius: 5
    },
  });

