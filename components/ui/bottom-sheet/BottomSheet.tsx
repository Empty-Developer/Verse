import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import Input from '../Input'
import Button from '../Button'

type Props = {
  snapTo: string;
  backgroundColor: string;
  backDropColor: string;
  children?: ReactNode; 
}

export interface BottomSheetMethod {
  expand: () => void;
  close: () => void;
}

export default function BottomSheet() {
  return (
    <>
      <Text style={styles.label}>Comments</Text>
      <View>

      </View>
      <Input />
      <Button
        title='Submit'
      />
    </>
  )
}

const styles = StyleSheet.create({
  label: {

  }
})