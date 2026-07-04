import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search } from 'lucide-react-native'

export default function Library() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.searchBox}>
        <Search style={styles.iconSearch}/>
        <TextInput
          style={styles.input}
          placeholder='Search...'
        />
      </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

})