import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from '../components/SplashScreen'

const index = () => {
  return (
    <SafeAreaView>
      <SplashScreen />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})