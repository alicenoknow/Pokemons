import React, { createRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { PokemonAnimation } from './PokemonAnimation';

interface AnimationProps {
    clicked: boolean | undefined;
    setClicked: ((click: boolean) => void) | undefined;
}

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
    row3: {
      flexDirection: 'row'
    }
  });

    return (
       <>
            <View style={styles.row1}>
                <PokemonAnimation  size={130} ref={elRefs[0]} rotation='60deg' source={require('../assets/animations/diglett.json')}/>
                <PokemonAnimation  size={110} ref={elRefs[1]} rotation='90deg' source={require('../assets/animations/pikachu.json')}/>
                <PokemonAnimation  size={130} ref={elRefs[2]} rotation='120deg' source={require('../assets/animations/diglett.json')}/>
            </View>
            <View style={styles.row2}>
                <PokemonAnimation  size={110} ref={elRefs[3]} rotation='225deg' source={require('../assets/animations/pikachu.json')}/>
                <PokemonAnimation  size={110} ref={elRefs[4]} rotation='0deg' source={require('../assets/animations/squirtle.json')}/>
                <PokemonAnimation  size={110} ref={elRefs[5]} rotation='135deg' source={require('../assets/animations/pikachu.json')}/>
            </View>
            <View style={styles.row3}>
                <PokemonAnimation  size={130} ref={elRefs[6]} rotation='210deg' source={require('../assets/animations/diglett.json')}/>
                <PokemonAnimation  size={110} ref={elRefs[7]} rotation='180deg' source={require('../assets/animations/pikachu.json')}/>
                <PokemonAnimation  size={130} ref={elRefs[8]} rotation='150deg' source={require('../assets/animations/diglett.json')}/>
            </View>
        </>
    );
  })

