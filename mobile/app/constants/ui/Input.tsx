import { StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native'
import React from 'react'

interface InputProps extends TextInputProps{
  style?: TextStyle;
}

const Input = ({style, ...props}: InputProps) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#999"
      style={[styles.inputStyle, style]}
    />
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    width: "80%"
  }
})

export default Input