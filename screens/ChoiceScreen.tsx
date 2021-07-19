import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ReactElement } from 'react';
import { loadPokemonBatch } from '../utlis/api';
import { PokemonInfo } from '../types';
import PokemonChoiceImage from '../components/PokemonChoiceImage';
import { RouteProp } from '@react-navigation/native';

interface ChoiceScreenProps {
    route: RouteProp<{ params: { index: number } }, 'params'>;
  }

export default function ChoiceScreen(props: ChoiceScreenProps): ReactElement {
    const [url, setUrl] = React.useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
    const [pokemons, setPokemons] = React.useState<ReadonlyArray<PokemonInfo>>([]);
    const addPokemons = (newPokemons: ReadonlyArray<PokemonInfo>) => { setPokemons([...pokemons, ...newPokemons]) }    

    React.useEffect(() => { loadPokemonBatch(addPokemons, url, setUrl) }, []);
    const renderPokemon = (pokemonObject: PokemonInfo) => {
        return (
        <PokemonChoiceImage url={pokemonObject.url} name={pokemonObject.name} nameToRender={pokemonObject.name} index={props.route.params.index} />
        );
    }

    return (
        <View style={styles.container}>
        <FlatList
            data={pokemons}
            renderItem={({ item }) => renderPokemon(item)}
            onEndReachedThreshold={4}
            onEndReached={() => loadPokemonBatch(addPokemons, url, setUrl)}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={renderSeparator}/>
        </View>
        );
}

const renderSeparator = () => {
    return (
    <View style={styles.separator} />
    );
}


const styles = StyleSheet.create({
    pokemon: {
    margin: 10,
    width: 200,
    height: 200,
    resizeMode: 'center'
    },
    separator: {
    height: 1,
    width: 250,
    backgroundColor: "#3337"
    },
    container: {
        alignItems: 'center', 
        justifyContent: 'center'
    }
});