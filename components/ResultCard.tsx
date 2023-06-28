import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../theme'

const ResultCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, nesciunt laboriosam. Aliquid sed distinctio laboriosam, in quis dolores, repellat nesciunt odio tempora explicabo accusamus dolorum odit reprehenderit aut. Voluptates, tenetur.</Text>
      <Image 
        source={require('../assets/images/image1.jpeg')}
        style={styles.image}
      />
    </View>
  )
}

export default ResultCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    gap: 10
  },
  prompt: {
    fontFamily: FONTS["400"],
    fontSize: 13,
    color: COLORS.black
  },
  image: {
    width: '100%',
    borderRadius: 14,
    height: SIZES.height * 0.35,
    // resizeMode: 'contain'
  }
})