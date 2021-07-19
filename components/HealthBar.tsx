import React from 'react';

import { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';



export default function HealthBar(props: {health: number, maxHealth: number}): ReactElement {
  return (
        <View style={{width: (props.health * 100 / props.maxHealth - 20) + '%',  ...styles.health}}></View>
  );
}

const styles = StyleSheet.create({
  health: {
    backgroundColor: '#00cc00', 
    height: 20
  }
});
