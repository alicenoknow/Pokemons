import * as React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { PokemonDetailsType } from '../types';

type imageUrlCallback = (pokemonImageUrl: string) => void;

interface FindButtonProps {
  onFindPress: (text: string) => Promise<PokemonDetailsType | undefined>;
  onChangeUrl: imageUrlCallback;
  onNameChange: (text: string) => void;
  setClick: (clicked: boolean) => void;
}

export default function FindPokemon(props: FindButtonProps) {

  const [text, setText] = React.useState('');
  const onFindPress = () => {
    async function setUrl() {
      const pokemonDetails = await props.onFindPress(text);
      console.log(pokemonDetails)
      if (pokemonDetails){
        props.onChangeUrl(pokemonDetails.url);
      }
      else {
        props.onChangeUrl('');
      }
    }
    setUrl();
    props.setClick(true);
    props.onNameChange(text);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type name"
        onChangeText={setText}
        value={text}>
      </TextInput>
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
    padding: 10
  },
  button: {
    fontSize: 10,
    backgroundColor: '#acf',
    padding: 10,
    marginLeft: 20,
    width: '30%',
    alignItems: 'center',
    borderRadius: 5
  },
});

