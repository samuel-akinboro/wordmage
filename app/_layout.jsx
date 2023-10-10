import { Stack } from "expo-router";
import { useFonts } from 'expo-font'
import { useEffect } from "react";
import GeneratedImagesProvider from "../providers/generatedImages";

export default function App() {
  const [fontsLoaded] = useFonts({
    poppinsRegular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    poppinsMedium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    poppinsSemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    poppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    poppinsExtraBold: require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
  })

  useEffect(() => {
    if(fontsLoaded){
      // hide splashcreen
    }
  }, [fontsLoaded])

  if(!fontsLoaded) {
    return null;
  }

  return (
    <GeneratedImagesProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </GeneratedImagesProvider>
  )
}