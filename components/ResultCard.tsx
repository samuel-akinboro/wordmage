import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../theme'
import { Feather } from '@expo/vector-icons';

const ResultCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, nesciunt laboriosam. Aliquid sed distinctio laboriosam, in quis dolores, repellat nesciunt odio tempora explicabo accusamus dolorum odit reprehenderit aut. Voluptates, tenetur.</Text>
      <Image 
        source={require('../assets/images/image1.jpeg')}
        style={styles.image}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerBtn, {flex: 1}]}>
          <Text style={styles.footerBtnText}>Make variation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <View style={styles.footerBtnIconContainer}>
            <Feather name="refresh-cw" size={11} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <View style={styles.footerBtnIconContainer}>
            <Feather name="arrow-down" size={12} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ResultCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    gap: 12,
  },
  prompt: {
    fontFamily: FONTS["400"],
    fontSize: 13,
    color: COLORS.black
  },
  image: {
    width: '100%',
    borderRadius: 6,
    height: SIZES.height * 0.35,
    // resizeMode: 'contain'
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  footerBtn: {
    borderWidth: 0.7,
    borderColor: COLORS.gray,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 16,
    minWidth: 80
  },
  footerBtnText: {
    fontSize: 12,
    color: COLORS.gray
  },
  footerBtnIconContainer: {
    backgroundColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 20
  }
})