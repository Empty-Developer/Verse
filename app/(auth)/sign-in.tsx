import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Button from '@/components/ui/Button';

export default function SigIn() {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.1, y: 0.1}} end={{x: -2, y: 1}}
        locations={[0,0.1,0.4]}
        colors={["rgba(242,217,239,1)", "rgba(233,232,206,1)", "rgba(200,210,214,1)", "rgba(217,242,225,1)", "transparent" ]}
        style={styles.background}
      />
      <Text style={styles.titleStyle}>Welcome to Login</Text>
      <Text style={styles.descriptionStyle}>Welcome to Verse Log in now to access your account all the feature built for you.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1200
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: 40,
    fontFamily: "SF Compact Rounded",
    textAlign: 'center',
  },
  descriptionStyle: {
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
  }
})
