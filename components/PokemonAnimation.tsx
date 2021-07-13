import React from 'react';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export { PokemonAnimation }

interface AnimationProps {
  source: any,
  ref: any,
  rotation: string,
  size: number
}

const PokemonAnimation = React.forwardRef((props: AnimationProps, ref: any) => {

  function onPress() {
    const anim = ref.current;
    if (anim) {
      anim.reset();
      anim.play();
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}>
      <LottieView
        ref={ref}
        source={props.source}
        loop={false}
        style={{
          width: props.size,
          height: props.size,
          transform: [{ rotate: props.rotation }],
        }}
        autoPlay={true} />
    </TouchableOpacity>
  );
})
