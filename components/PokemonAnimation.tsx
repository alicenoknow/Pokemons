import React from 'react';
import LottieView from 'lottie-react-native';

export { PokemonAnimation }

interface AnimationProps {
  source: any,
  ref: any,
  rotation: string,
  size: number
}

const PokemonAnimation = React.forwardRef((props: AnimationProps, ref: any) => {
  return (
        <LottieView
          ref={ref}
          source={props.source}
          loop={false}
          style={{
              width: props.size,
              height: props.size,
              transform: [{ rotate: props.rotation}]
          }}
          autoPlay={true}
        />
  );
  })
