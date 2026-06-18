import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const slider: OnboardingData[] = [
  {
    id: 1,
    animation: require("@/assets/animated/characters.json"),
    text: "Collection of Texts: Publish",
    textColor: '#60230b',
    backgroundColor: '#e098a9'
  },
  {
    id: 2,
    animation: require("@/assets/animated/mirror.json"),
    text: "Collection of Texts: Publish",
    textColor: '#BFD75C',
    backgroundColor: '#A173CD'
  },
  {
    id: 3,
    animation: require("@/assets/animated/tower.json"),
    text: "Collection of Texts: Publish",
    textColor: '#F2FF00',
    backgroundColor: '#2830B5'
  },
  {
    id: 4,
    animation: require("@/assets/animated/gift.json"),
    text: "Collection of Texts: Publish",
    textColor: '#651D09',
    backgroundColor: '#89D452'
  },

];

export default slider
