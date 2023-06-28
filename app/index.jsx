import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../theme'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import PromptForm from '../components/PromptForm'

const options = {
  headerShown: true,
  headerTitle: '',
  headerLeft: () => (
    <View style={styles.logoContainer}>
      <Text style={styles.logoSym}>*</Text>
      <Text style={styles.logo}>
        Wordmage
      </Text>
    </View>
  ),
  headerRight: () => (
    <TouchableOpacity style={styles.leftBtn}>
      <FontAwesome5 name="crown" size={12} color={COLORS.primary} />
      <Text style={styles.leftBtnText}>Premium</Text>
    </TouchableOpacity>
  )
}

const index = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Screen options={options} />
      <StatusBar style='dark' />
      <FlatList
        style={styles.flatlist}
      />
      <PromptForm />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  logo: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS["500"],
    paddingLeft: 25
  },
  logoSym: {
    color: COLORS.primary,
    fontSize: 44,
    fontFamily: FONTS["800"],
    position: 'absolute',
    top: -11
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBtn: {
    backgroundColor: COLORS.lightOrange,
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 16
  },
  leftBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily: FONTS["500"]
  },
  flatlist: {
    flex: 1
  }
})