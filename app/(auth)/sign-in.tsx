import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Link } from 'expo-router';

export default function SigIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.1, y: 0.1}} end={{x: -2, y: 1}}
        locations={[0,0.1,0.4]}
        colors={["rgba(242,217,239,1)", "rgba(233,232,206,1)", "rgba(200,210,214,1)", "rgba(217,242,225,1)", "transparent" ]}
        style={styles.background}
      />
      <View style={{marginBottom: 10}}>
        <Text style={styles.titleStyle}>Welcome to Login</Text>
        <Text style={styles.descriptionStyle}>Welcome to Verse Log in now to access your account all the feature built for you.</Text>
      </View>
      <Input
        placeholder='E-mail'
        onChangeText={setEmail}
        value={email}
        keyboardType='email-address'
        style={styles.input}
      />
      <Input
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        keyboardType='email-address'
        style={styles.input}
        secureTextEntry
      />
      <Button
        title='Log in'
        style={styles.button}
        textStyle={{
          fontWeight: '400',
          fontSize: 18,
          fontFamily: "SF Compact Rounded",
        }}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Link href={'/registration'}>
         <Text style={styles.linkText}>
            Sign Up
         </Text>
        </Link>
      </View>
      {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingVertical: 20,}}>
        <View style={styles.lineOr}></View>
        <Text>Or Log in with</Text>
        <View style={styles.lineOr}></View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title='Sign in Google'
        />
        <Button
          title='Sign in Apple'
        />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
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
    fontSize: 36,
    fontFamily: "SF Compact Rounded",
    textAlign: 'center',
  },
  descriptionStyle: {
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    padding: '4%'
  },
  input: {
    borderRadius: 50,
    padding: 15,
    fontSize: 15,
  },
  button: {
    borderRadius: 50,
    margin: 12
  },
  lineOr: {
    borderColor: "#000",
    borderWidth: 0.5,
    paddingHorizontal: 60,
    margin: 12,
    left: 0,
    right: 0,
    top: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 17,
    color: "#575656ff"
  },
  linkText: {
    fontSize: 17,
    fontWeight: '500',
  }
})
