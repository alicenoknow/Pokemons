
import React, { Component } from 'react'
import { Text, View,StyleSheet ,Animated} from 'react-native'
import  {PanGestureHandler} from 'react-native-gesture-handler'

export default class RnGestureHandler extends Component {

 translateX = new Animated.Value(0)
 translateY = new Animated.Value(0)
    handleGesture = Animated.event([{nativeEvent: {translationX: this.translateX,translationY:this.translateY}}], { useNativeDriver: true });
    render() {
        const circleTransformStyle = {
                transform:[
                    {
                        translateY : this.translateY
                    },
                    {
                        translateX : this.translateX
                    }
                ]
            }
        
        return (
            <View style={[styles.container]}>
            <PanGestureHandler onGestureEvent={this.handleGesture}>
            <Animated.View style={[styles.circle,circleTransformStyle]} />
            </PanGestureHandler>
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      flexDirection: "column",
      backgroundColor: "#fff"
    },

    circle: {
        width: 150,
        height: 150,
        backgroundColor: "#c00000",
        borderRadius: 100
      },
    title:{
        fontSize:20,
        textAlign:"center"
    },
    separator: {
      width: "100%",
      height: 1,
      backgroundColor: "#ccc"
    },
    leftItem: {
      flex: 1,
      backgroundColor: "#76a21e",
      justifyContent: "center"
    }})