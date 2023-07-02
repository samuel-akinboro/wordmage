import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { EmitterSubscription } from 'react-native';

interface Props {
  query: string;
  setQuery: (value: string) => void,
  handleSubmit: () => void,
  loading: boolean
}

const PromptForm = ({query, setQuery, handleSubmit, loading}: Props) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = event => setTimeout(() => {setKeyboardOffset(event.endCoordinates.height)}, 400);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  return (
    <View style={[styles.container, {position: keyboardOffset === 0 ? 'relative' : 'absolute', bottom: keyboardOffset === 0 ? 0 : keyboardOffset}]}>
      <View style={styles.promptBox}>
        <TextInput
          value={query}
          style={styles.input}
          onChangeText={(text) => setQuery(text)}
          placeholder='Enter prompt'
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity disabled>
          <Ionicons name="flash" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={[styles.btn, {opacity: loading ? 0.5 : 1}]} 
        onPress={() => {
          Keyboard.dismiss()
          handleSubmit()
        }}
        disabled={loading}
      >
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
    borderColor: COLORS.lightgray
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