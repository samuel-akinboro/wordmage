import AsyncStorage from '@react-native-async-storage/async-storage';

const storageParam = 'created-images'

export async function fetchStorageImages() {
  const storage = await AsyncStorage.getItem(storageParam);
  const storageData = await JSON.parse(storage);
  return storageData || [];
}

export default async function(data) {
  try {
    const storage = await AsyncStorage.getItem(storageParam);
    const storageData = JSON.parse(storage);

    if(!storageData) {
      let images = [];
      images.push(data);
      await AsyncStorage.setItem(storageParam, JSON.stringify(images))
    }else {
      const images = [...storageData, data]
      await AsyncStorage.setItem(storageParam, JSON.stringify(images))
    }
  } catch (err) {
    console.log(err)
  }
}