import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Heart, Plus } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Link href={"/(protected)/create-post"}>
          <Plus />
        </Link>
        <Text style={styles.mainText}>
          Verse
        </Text>
        <Link href={'/(protected)/like'}>
          <Heart />
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  mainText: {
    fontWeight: '600',
    fontSize: 32,
    fontFamily: "SF Compact Rounded",
  }
})