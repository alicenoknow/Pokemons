import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import FavsList from '../components/FavsList';


export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <FavsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
