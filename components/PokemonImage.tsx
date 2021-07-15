import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useCallback } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NotFoundAnimation } from './NotFoundAnimation';

interface PokemonImageProps {
  url: string;
  name: string;
  nameToRender?: string;
  clicked?: boolean;
  setClick?: (click: boolean) => void;
}

export default function PokemonImage(props: PokemonImageProps) {

  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('DetailsScreen', { name: props.name });
  }, [props.name])

  const getContent = () => {
    if (props.url !== '') {
      return (
          <TouchableOpacity
            onPress={onPress}>
            <Text style={styles.name}>{props.nameToRender}</Text>
            <Image
              style={styles.pokemon}
              source={{ uri: props.url }} />
          </TouchableOpacity>);
    }
    else {
      return (
          <>
            <View style={styles.animationContainer}>
              <NotFoundAnimation clicked={props.clicked} setClicked={props.setClick} />
            </View>
            <Text style={styles.name} >Pokemon {props.name} does not exist :c</Text>
          </>);
    }
  }
  return (
    <View style={styles.mainContainer}>
      {getContent()}
    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pokemon: {
    width: 180,
    height: 180,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420',
    margin: 15,
  },
  separator: {
    height: 1,
    width: 250,
    backgroundColor: "#3337"
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});

