import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { createRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PikachuSprite from './PikachuSprite';
import { ReactElement } from 'react';

const screen = Dimensions.get('window');
const LATITUDE_DELTA = 0.2;
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

export const getSteps = (prevCoordinates: LatLng, newCoordinates: LatLng, steps: number): LatLng[] => {
    const dLat = (newCoordinates.latitude - prevCoordinates.latitude) / steps;
    const dLon = (newCoordinates.longitude - prevCoordinates.longitude) / steps;
    return Array(steps).fill(null).map((_, i) => { return { latitude: prevCoordinates.latitude + (i + 1) * dLat, longitude: prevCoordinates.longitude + (i + 1) * dLon } });
}

export default function Map(): ReactElement {

    const marker = createRef<Marker>();
    const map = createRef<MapView>();

    const [currentCoordinates, setCurr] = useState(initialCoords);
    const [direction, setDirection] = useState(Direction.Right);

    const onPress = ({ nativeEvent }: MapEvent) => {
        animateGoTo(nativeEvent.coordinate);
    }

    const animateGoTo = (nextCoordinates: LatLng) => {
        map.current?.animateCamera({
            center: { latitude: nextCoordinates.latitude, longitude: nextCoordinates.longitude }
        }, { duration: 1000 });
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
                onPress={onPress}
                ref={map}
                initialRegion={{
                    ...initialCoords,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Marker
                    coordinate={currentCoordinates}
                    ref={marker}
                    style={styles.marker}>
                    <PikachuSprite rotation={direction.rotation} scale={direction.scale} />
                </Marker>
            </MapView>
            <TouchableOpacity
                onPress={goToRandom}
                style={styles.button}>
                <Text style={styles.text}>Hops</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 5,
        height: '100%',
        width: '100%',
    },
    button: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#acf'
    },
    text: {
        fontSize: 40,
        padding: 40
    },
    marker: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});