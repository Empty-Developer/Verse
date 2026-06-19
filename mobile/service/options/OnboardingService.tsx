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
    text: "Start Your Adventure With a Look at New Books",
    textColor: '#60230b',
    backgroundColor: '#e098a9'
  },
  {
    id: 2,
    animation: require("@/assets/animated/mirror.json"),
    text: "Discover a New Side Of Yourself With New Authors",
    textColor: '#BFD75C',
    backgroundColor: '#A173CD'
  },
  {
    id: 3,
    animation: require("@/assets/animated/tower.json"),
    text: "Find New Inspiration By Reading New Texts",
    textColor: '#F2FF00',
    backgroundColor: '#2830B5'
  },
  {
    id: 4,
    animation: require("@/assets/animated/gift.json"),
    text: "Get The Chance To Become a Great Author\nLet's Get Started",
    textColor: '#651D09',
    backgroundColor: '#89D452'
  },

];

export default slider
