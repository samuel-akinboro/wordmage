import { Image, StyleSheet, Text, View, TouchableOpacity, Animated, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../theme'
import { Feather } from '@expo/vector-icons';
import omniiferApi from '../api/omniinfer';
import { GeneratedImagesContext } from '../providers/generatedImages';
import { addImage } from '../actions/generatedImageActions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';

function LoadingIndicator() {
  const animatedValue = useRef(new Animated.Value(0)).current

  const dotStyle = {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary
  }

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ).start()
  }, [])

  return (
    <Animated.View 
      style={[
        styles.image, 
        {
          backgroundColor: '#f8f8f8',
          borderWidth: 1.5,
          borderColor: '#aeabab',
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          })
        }
      ]
      }
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
      }}>
        <Animated.View 
          style={[
            dotStyle, 
            {transform: [{translateY: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [-3, 0, -3]
            })}]}
          ]} 
          />
        <Animated.View 
          style={[
            dotStyle, 
            {transform: [{translateY: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, -3, 0]
            })}]}
          ]} 
        />
        <Animated.View 
          style={[
            dotStyle, 
            {transform: [{translateY: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [-3, 0, -3]
            })}]}
          ]} 
        />
      </View>
    </Animated.View>
  )
}

interface Props {
  uri: string;
  prompt: string;
  taskId: string;
}

const ResultCard = ({uri, prompt, taskId}: Props) => {
  const [loading, setLoading] = useState(false);
  const [_, dispatch] = useContext(GeneratedImagesContext);
  const [isDownloading, setIsDownloading] = useState(false)

  const fetchImage = (taskId: string) => {
    omniiferApi.get('/progress', {
      params: {
        task_id: taskId
      }
    })
    .then((res) => {
      if(res?.data?.data?.imgs == null) {
        fetchImage(taskId)
      }else{
        const payload = {
          id: taskId,
          uri: res?.data?.data?.imgs[0]
        }
        dispatch(addImage(payload))
        setLoading(false)
      }
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    if(!uri) {
      setLoading(true);
      fetchImage(taskId)
    } 
  }, [uri])

  const imageUrl = uri;

const handleDownload = async () => {
    if(imageUrl){
      setIsDownloading(true)
      let date = moment().format('YYYYMMDDhhmmss')
      let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
      try {
          const res = await FileSystem.downloadAsync(imageUrl, fileUri)
          saveFile(res.uri)
      } catch (err) {
          console.log("FS Err: ", err)
          setIsDownloading(false)
      }
    }
}

const saveFile = async (uri) => {
  try {
    // Request device storage access permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
    // Save image to media library
      await MediaLibrary.saveToLibraryAsync(uri);
      setIsDownloading(false)
      console.log("Image successfully saved");
    }
  } catch (error) {
    setIsDownloading(false)
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      {!loading ? (
        <Image 
          source={uri ? {uri} : require('../assets/images/image1.jpeg')}
          style={styles.image}
        />
      ): <LoadingIndicator />}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerBtn, {flex: 1}]}>
          <Text style={styles.footerBtnText}>Make variation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <View style={styles.footerBtnIconContainer}>
            <Feather name="refresh-cw" size={11} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={handleDownload} disabled={isDownloading}>
          <View style={styles.footerBtnIconContainer}>
            {!isDownloading ? <Feather name="arrow-down" size={12} color={COLORS.white} /> : <ActivityIndicator size={12} />}
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