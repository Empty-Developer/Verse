import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Link } from 'expo-router';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Registration() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const register = useAuthStore((state) => state.register)

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all the fields")
      return
    }

    try {
      setLoading(true)
      await register(email, password, username)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <LinearGradient
        start={{x: 0.1, y: 0.1}} end={{x: -2, y: 1}}
        locations={[0,0.1,0.4]}
        colors={["rgba(242,217,239,1)", "rgba(233,232,206,1)", "rgba(200,210,214,1)", "rgba(217,242,225,1)", "transparent" ]}
        style={styles.background}
      />
      <View style={{marginBottom: 10}}>
        <Text style={styles.titleStyle}>Create an account</Text>
        <Text style={styles.descriptionStyle}>Create an account to unlock all feature and get the most out of Verse.</Text>
      </View>
      <Input
        placeholder='Name'
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
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
        style={styles.input}
        secureTextEntry
      />
      <Button
        title='Sign Up'
        style={styles.button}
        onPress={handleRegister}
        disabled={isLoading}
        textStyle={{
          fontWeight: '400',
          fontSize: 18,
          fontFamily: "SF Compact Rounded",
        }}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Are your have an account? </Text>
        <Link href={'/sign-in'}>
         <Text style={styles.linkText}>
            Sign In
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
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
    padding: '4%',
    color: '#666565ff'
  },
  input: {
    borderRadius: 50,
    padding: 15,
    margin: 5,
    fontSize: 15,
  },
  button: {
    borderRadius: 60,
    margin: 15
  },
  // lineOr: {
  //   borderColor: "#000",
  //   borderWidth: 0.5,
  //   paddingHorizontal: 60,
  //   margin: 12,
  //   left: 0,
  //   right: 0,
  //   top: 0,
  // },
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
