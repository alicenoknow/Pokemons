import MapView, { Circle, LatLng, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { createRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PikachuSprite from './PikachuMap';

const screen = Dimensions.get('window');
const LATITUDE_DELTA = 0.122;
const LONGITUDE_DELTA = LATITUDE_DELTA * screen.width / screen.height;

const initialCoords = {
    latitude: 50.048908,
    longitude: 19.965319
}

const Direction = {
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

    const [currentCoordinates, setCurr] = useState(initialCoords);
    const [direction, setDirection] = useState(Direction.Right);

    const onPress = (event: any) => {
        animateGoTo(event.coordinate);
    }

    const animateGoTo = (nextCoordinates: LatLng) => {
        map.current?.animateToRegion({
            latitude: nextCoordinates.latitude,
            longitude: nextCoordinates.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }, 1000);
        setDirection(findDirection(currentCoordinates, nextCoordinates))
        setCurr(nextCoordinates);
    }

    const findDirection = (prevCoordinates: LatLng, newCoordinates: LatLng) => {
        if (prevCoordinates.longitude < newCoordinates.longitude) {
            return Direction.Right;
        }
        else {
            return Direction.Left;
        }
    }

    const goToRandom = () => {
        const newCoords = {
            latitude: currentCoordinates.latitude + (Math.random() - 0.5) / 5,
            longitude: currentCoordinates.longitude + (Math.random() - 0.5) / 5
        }
        animateGoTo(newCoords);
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                onPress={e => onPress(e.nativeEvent)}
                ref={map}
                initialRegion={{
                    ...initialCoords,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Marker
                    coordinate={currentCoordinates}
                    ref={marker}>
                    <PikachuSprite rotation={direction.rotation} scale={direction.scale} />
                </Marker>
            </MapView>
            <TouchableOpacity
                onPress={goToRandom}
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