import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

export const Slider = [
  {
    id: "1",
    animation: require("@/assets/animated/Book.json"),
    text: "Collection of Texts: Publish",
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce'
  },
  {
    id: "2",
    animation: require("@/assets/animated/Drink-1.json"),
    text: "Collection of Texts: Publish",
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce'
  },
  {
    id: "3",
    animation: require("@/assets/animated/Drink.json"),
    text: "Collection of Texts: Publish",
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce'
  },
  {
    id: "4",
    animation: require("@/assets/animated/Game asset-1.json"),
    text: "Collection of Texts: Publish",
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce'
  },
  {
    id: "5",
    animation: require("@/assets/animated/Gameasset.json"),
    text: "Collection of Texts: Publish",
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce'
  },
];
