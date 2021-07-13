import React, { createRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { PokemonAnimation } from './PokemonAnimation';
import { diff } from 'react-native-reanimated';

interface AnimationProps {
  clicked: boolean | undefined;
  setClicked: ((click: boolean) => void) | undefined;
}

const pikachuImage = require('../assets/animations/pikachu.json');
const diglettImage = require('../assets/animations/diglett.json');
const squirtleImage = require('../assets/animations/squirtle.json');

export const NotFoundAnimation = React.forwardRef((props: AnimationProps, ref) => {

  const refsNum = 9;
  const [elRefs, setElRefs] = useState([]);

  React.useEffect(() => {
    setElRefs(elRefs => (
      Array(refsNum).fill(null).map((_, i) => elRefs[i] || createRef())
    ));
  }, [refsNum]);

  useEffect(() => {
    elRefs.forEach((ref: any) => {
      const anim = ref.current;
      if (anim) {
        anim.reset();
        anim.play();
      }
    })
    if (props.setClicked !== undefined) {
      props.setClicked(false);
    }
  }, [props.clicked]);

  const styles = StyleSheet.create({
    row1: {
      flexDirection: 'row',
      marginBottom: -30
    },
    row2: {
      flexDirection: 'row'
    },
  });

  return (
    <>
      <View style={styles.row1}>
        <PokemonAnimation size={130} ref={elRefs[0]} rotation='60deg' source={diglettImage} />
        <PokemonAnimation size={110} ref={elRefs[1]} rotation='90deg' source={pikachuImage} />
        <PokemonAnimation size={130} ref={elRefs[2]} rotation='120deg' source={diglettImage} />
      </View>
      <View style={styles.row2}>
        <PokemonAnimation size={110} ref={elRefs[3]} rotation='225deg' source={pikachuImage} />
        <PokemonAnimation size={110} ref={elRefs[4]} rotation='0deg' source={squirtleImage} />
        <PokemonAnimation size={110} ref={elRefs[5]} rotation='135deg' source={pikachuImage} />
      </View>
      <View style={styles.row2}>
        <PokemonAnimation size={130} ref={elRefs[6]} rotation='210deg' source={diglettImage} />
        <PokemonAnimation size={110} ref={elRefs[7]} rotation='180deg' source={pikachuImage} />
        <PokemonAnimation size={130} ref={elRefs[8]} rotation='150deg' source={diglettImage} />
      </View>
    </>
  );
})

