import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { createRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PikachuSprite from './PikachuMap';

var coords = [{latitude: 50.048908, longitude: 19.965319},
                {latitude: 49.993585, longitude: 19.8680989},
                {latitude: 50.037809, longitude: 19.937386},
                {latitude: 49.991532, longitude: 19.909643},
                {latitude: 50.118004, longitude: 19.0}
                ];
var COORDS_NUM = 5;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE = 50.048908;
const LONGITUDE = 19.965319;


const Direction =  {
    Left: {
        rotation: 40,
        scale: 1
    },
    Right: {
        rotation: 340,
        scale: -1
    } 
  }

export default function Map() {

    const marker = createRef<Marker>();
    const map = createRef<MapView>();

    const [index, setIndex] = useState(1);
    const [coordinates, setCoordinates] = useState(coords[0]);
    const [tapCoordinates, setTapCoordinates] = useState(coords[0]);
    const [direction, setDirection] = useState(Direction.Right);

    const onPress = (event: any) => {
        setTapCoordinates(event.coordinate)
        coords.splice(index, 0, event.coordinate)
        COORDS_NUM++;
    }

    const animateGoTo = () => {
        setCoordinates(coords[index])
        map.current?.animateToRegion({ latitude: coords[index].latitude,
            longitude: coords[index].longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA, }, 1000);
        setIndex((index + 1) % COORDS_NUM);
        setDirection(findDirection())
    }

    const findDirection = () => {
        const newCoordinates = coords[index];
        const prevCoordinates = coords[getPrev()];

        if (prevCoordinates.longitude < newCoordinates.longitude) {
            return Direction.Right;
        }
        else {
            return Direction.Left;
        }
    }

    const getPrev = () => {
        if (index === 0) {
            return COORDS_NUM - 1;
        }
        return index - 1;
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                onPress={e => onPress(e.nativeEvent)}
                followsUserLocation={true}
                ref={map}
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Marker
                    coordinate={coordinates}
                    ref={marker}>
                    <PikachuSprite rotation={direction.rotation} scale={direction.scale}/>
                </Marker>
     
                <Circle 
                center={tapCoordinates} 
                radius={400} 
                fillColor='rgba(4,2,150,0.3)'
                strokeColor='rgba(1,1,1,0)'/>
            </MapView>
            <TouchableOpacity
                onPress={animateGoTo}
                style={styles.button}>
                <Text style={styles.text}>Next step</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 300,
    },
    button: {
        height: 300,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        padding: 40
    },
    img: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
        
    }

});