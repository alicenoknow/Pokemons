import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

interface FavButtonProps {
  name: string;
}

export default function FindPokemon(props: FavButtonProps) {

  const FavContext = React.createContext(getAllFromStorage());


  const onFindPress = () => {
    if (props.name){ 
      const key = props.name.toLowerCase()
      addToStorage(key, key);
      getAllFromStorage();
    }
  }

    return (
      <View>
        <TouchableOpacity
            style={styles.button}
            onPress={onFindPress}>
        <Text style={styles.button}>💙</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  const styles = StyleSheet.create({
    button: {
      fontSize: 40,
      padding: 2,
      width: '40%',
    },
  });


async function addToStorage(newKey: string, newValue: string) {
  try {
    const value = await AsyncStorage.getItem(newKey);
    if (value !== null) {
      Alert.alert(newKey + " already in your favs");
    }
    else {
      await AsyncStorage.setItem(newKey, newValue);
      Alert.alert(newKey + " added to your favs");
      
    }

  } catch (error) {
    console.log(error)
  }
}

async function getFromStorage(key: string) {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      console.log(value);
    }
  } catch (error) {
    console.log(error)
  }
}

async function getAllFromStorage() {
  try {
    const keys = await AsyncStorage.getAllKeys();

    keys.map(req => console.log(req));

  } catch (error) {
    console.error(error)
  }
}