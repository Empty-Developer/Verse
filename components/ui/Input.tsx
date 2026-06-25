import { StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native'
import React from 'react'

interface InputProps extends TextInputProps{
  style?: TextStyle;
}

const Input = ({style, ...props}: InputProps) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#706f6fff"
      style={[styles.inputStyle, style]}
    />
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "#acacacff",
    padding: 10,
    // width: "100%"
  }
})

export default Input