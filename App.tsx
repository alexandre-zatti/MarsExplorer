import React from 'react';
import AppLoading from 'expo-app-loading';
import Navigator from "./src/navigation/homeStack";
import {
  useFonts,
  ChakraPetch_300Light,
  ChakraPetch_300Light_Italic,
  ChakraPetch_400Regular,
  ChakraPetch_400Regular_Italic,
  ChakraPetch_500Medium,
  ChakraPetch_500Medium_Italic,
  ChakraPetch_600SemiBold,
  ChakraPetch_600SemiBold_Italic,
  ChakraPetch_700Bold,
  ChakraPetch_700Bold_Italic
} from '@expo-google-fonts/chakra-petch'

const App = (): JSX.Element => {
  let [fontsLoaded] = useFonts({
    ChakraPetch_300Light,
    ChakraPetch_300Light_Italic,
    ChakraPetch_400Regular,
    ChakraPetch_400Regular_Italic,
    ChakraPetch_500Medium,
    ChakraPetch_500Medium_Italic,
    ChakraPetch_600SemiBold,
    ChakraPetch_600SemiBold_Italic,
    ChakraPetch_700Bold,
    ChakraPetch_700Bold_Italic
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <Navigator />
  );
}

export default App;