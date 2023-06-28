import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS } from '../theme';

const PromptForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.promptBox}>
        <TextInput
          style={styles.input}
          placeholder='Enter prompt'
          placeholderTextColor={COLORS.gray}
        />
        <Ionicons name="flash" size={14} color={COLORS.primary} />
      </View>
      <TouchableOpacity style={styles.btn}>
        <Feather name="send" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  )
}

export default PromptForm

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
    gap: 10
  },
  promptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#eceaea'
  },
  input: {
    flex: 1,
  },
  btn: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
    paddingRight: 1,
    paddingTop: 5
  }
})