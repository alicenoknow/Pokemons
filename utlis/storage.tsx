import { AsyncStorage, Alert } from 'react-native';

export async function addToStorage(newKey: string, newValue: string) {
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

export async function getAllFromStorage() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
  
    } catch (error) {
      console.error(error)
    }
  }

export async function initialStorage() {
  const allKeys = await getAllFromStorage();
  return allKeys ?? [];
}