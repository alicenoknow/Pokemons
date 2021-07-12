import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { useEffect } from 'react';

interface AnimationProps {
  source: any,
  speed?: number,
}

export default function PokemonAnimation(props: AnimationProps) {
  
  var animation: any = useRef();

  useEffect(() => {
    animation.play();
  }, []);

    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={newAnimation => {
            animation = newAnimation;
          }}
          style={{
            width: 160,
            height: 160,
          }}
          source={props.source}
          speed={props.speed}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    margin: 20,
  },

});
