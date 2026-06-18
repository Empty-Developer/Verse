import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnboardingData } from '../../../service/options/OnboardingService'
import { SharedValue } from 'react-native-reanimated';
import Dot from './Dot';

type Props = {
  slider: OnboardingData[];
  x: SharedValue<number>;
}

const Pagination = ({slider, x}: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {slider.map((_, index) => {
        return <Dot key={index} index={index} x={x}/>
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})