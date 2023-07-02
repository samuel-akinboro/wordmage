import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Animated } from 'react-native'
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

function LoadingIndicator() {
  const animationValue = useRef(new Animated.Value(0)).current

  const dotStyle = {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary
  }

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true
      })
    ).start()
  }, [])

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5
    }}>
      <Animated.View 
        style={[
          dotStyle, 
          {transform: [{translateY: animationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-3, 0, -3]
          })}]}
        ]} 
        />
      <Animated.View 
        style={[
          dotStyle, 
          {transform: [{translateY: animationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, -3, 0]
          })}]}
        ]} 
      />
      <Animated.View 
        style={[
          dotStyle, 
          {transform: [{translateY: animationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-3, 0, -3]
          })}]}
        ]} 
      />
    </View>
  )
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
        {
          !loading ? 
            (
              <TouchableOpacity disabled>
                <Ionicons name="flash" size={14} color={COLORS.primary} />
              </TouchableOpacity>
            ) : 
            <LoadingIndicator />
        }
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