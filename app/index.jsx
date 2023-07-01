import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { Fragment, useState } from 'react'
import { COLORS, FONTS } from '../theme'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import PromptForm from '../components/PromptForm'
import ResultCard from '../components/ResultCard'
import omniiferApi from '../api/omniinfer'
import Toast from 'react-native-toast-message';

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
  ),
  headerStyle: {
    backgroundColor: COLORS.white
  }
}

const index = () => {
  const [query, setQuery] = useState('');
  const [imageResult, setImageResult] = useState([])

  const handleSubmit = () => {
    omniiferApi.post('/txt2img', {
      "negative_prompt": "nsfw, ng_deepnegative_v1_75t, badhandv4, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), watermark",
      "sampler_name": "DPM++ 2M Karras",
      "batch_size": 1,
      "n_iter": 1,
      "steps": 20,
      "cfg_scale": 7,
      "seed": -1,
      "height": 1024,
      "width": 768,
      "model_name": "majicmixRealistic_v4_40121.safetensors",
      "prompt": "Best quality, masterpiece, ultra high res, (photorealistic:1.4), raw photo, 1girl, offshoulder, in the dark, deep shadow"
    })
    .then(response => {
      const taskId = response.data.data.task_id;
      // fetch image
      fetchImage(taskId)
    })
    .catch(error => {
      console.log(error)
      if(error?.message?.includes('429')){
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or 'none'
          text1: 'Too many requests',
          text2: 'Try again later',
          visibilityTime: 3000, // Duration to show the toast (in milliseconds)
          autoHide: true, // Hide the toast automatically after visibilityTime
        });
      }
    })

  }

  const fetchImage = (taskId) => {
    omniiferApi.get('/progress', {
      params: {
        task_id: taskId
      }
    })
    .then((res) => {
      if(res.data.data.imgs === null) {
        fetchImage(taskId)
      }else{
        setImageResult([...imageResult, {
          uri: res.data.data.imgs[0],
          prompt: JSON.parse(res.data.data.info).prompt
        }])
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <Fragment>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Stack.Screen options={options} />
        <StatusBar style='dark' />
        <FlatList
          data={imageResult}
          style={styles.flatlist}
          keyExtractor={(_, i) => i}
          renderItem={({item}) => <ResultCard uri={item.uri} prompt={item.prompt} />}
          contentContainerStyle={{gap: 15}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 10, backgroundColor: '#F3F3F5'}} />}
        />
        <PromptForm 
          query={query} 
          setQuery={setQuery} 
          handleSubmit={handleSubmit} 
        />
      </SafeAreaView>
      <Toast />
    </Fragment>
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
    flex: 1,
    backgroundColor: '#F3F3F5',
    padding: 10,
    paddingHorizontal: 16
  }
})