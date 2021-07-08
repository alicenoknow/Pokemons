import { PokemonInfo, PokemonJSONType } from "../types";


export { downloadPokemonImage, loadPokemonBatch, getPokemonInfo, isPokemonInfo, getPokemonUrl,} ;

type addPokemonsType = (newPokemons: ReadonlyArray<PokemonInfo>) => void;
type updateUrlType = (newUrl: string) => void;

async function downloadPokemonImage(pokemonName: string, imageUrlCallback: (pokemonImageUrl: string) => void) {
    try {
    const response = await fetch(getPokemonUrl(pokemonName).url);
    const responseJson = await response.json();
    imageUrlCallback(responseJson.sprites.front_default);
    } catch (error) {
      console.log(error);
    }
  }

function isPokemonInfo(pokemon: PokemonInfo | undefined): pokemon is PokemonInfo {
    return pokemon !== undefined;
  }
  
  async function loadPokemonBatch(updatePokemonsList: addPokemonsType, url: string, setUrl: updateUrlType) {
    try {
      const responseList = await fetch(url);
      const responseJsonList = await responseList.json();
      setUrl(responseJsonList.next)
      const pokemonsUrl: PokemonJSONType[] = responseJsonList.results
      const pokemonsPromise = pokemonsUrl.map(getPokemonInfo);
      const pokemonsInfo = await Promise.all(pokemonsPromise);
      const newPokemons = pokemonsInfo.filter(isPokemonInfo);
      updatePokemonsList(newPokemons)
  
    } catch (error) {
      console.log(error);
    }
  }

function getPokemonUrl(pokemonName: string): PokemonJSONType {
    return {
      url: 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase()
    }
  }
  
  async function getPokemonInfo(pokemon: PokemonJSONType): Promise<PokemonInfo | undefined> {
    try {
      const responseImage = await fetch(pokemon.url);
      const responseJsonImage = await responseImage.json();
      return { name: responseJsonImage.name, url: responseJsonImage.sprites.front_default }
    } catch (error) {
      console.log(error);
    }
  }

