import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleProps {
  text: string;
}

const Title =  (props: TitleProps) => {
  return (
    <Text style={styles.title}>{props.text}</Text>
  );
}

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#666'
    },
  });

  export default Title;