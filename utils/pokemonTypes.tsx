import { ImageRequireSource } from "react-native";
import { Bug, Dark, Dragon, Electric, Fairy, Fighting, Fire, Flying, Ghost, Grass, Ground, Ice, Normal, Poison, Psychic, Rock, Steel, Water } from "./requires";

export const TypeColor: { [name: string]: { color: string, url: ImageRequireSource } } = {
    "Normal": { color: '#aa9', url: Normal },
    "Water": { color: "#39f", url: Water },
    "Fire": { color: "#f42", url: Fire },
    "Electric": { color: "#fc3", url: Electric },
    "Grass": { color: "#7c5", url: Grass },
    "Ice": { color: "#6cf", url: Ice },
    "Fighting": { color: "#b54", url: Fighting },
    "Poison": { color: "#a59", url: Poison },
    "Ground": { color: "#db5", url: Ground },
    "Flying": { color: "#89f", url: Flying },
    "Psychic": { color: "#f59", url: Psychic },
    "Bug": { color: "#ab2", url: Bug },
    "Rock": { color: "#ba6", url: Rock },
    "Ghost": { color: "#66b", url: Ghost },
    "Dragon": { color: "#76e", url: Dragon },
    "Dark": { color: "#754", url: Dark },
    "Steel": { color: "#aab", url: Steel },
    "Fairy": { color: "#e9e", url: Fairy },
    "default": { color: "#fff0", url: Normal }
}