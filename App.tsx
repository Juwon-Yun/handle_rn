import AppLoading from 'expo-app-loading';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, useColorScheme} from 'react-native';

//https://docs.expo.dev/guides/icons/
import * as Font from 'expo-font';
import {Ionicons} from "@expo/vector-icons"
import {Asset, useAssets} from 'expo-asset';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styles/custom_theme';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(Ionicons.font)); 

const loadAssets = (images) => images.map(image => {
  if(typeof image === 'string'){
    return Image.prefetch(image);
  } else {
    return Asset.loadAsync(image);
  }
})

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = () => setIsLoading(true);
  const isDark = useColorScheme() === 'dark';

  const startLoading = async () => {
    // 2 type preload : local assets or assets API
    const fonts = loadFonts([Font.loadAsync(Ionicons.font), Font.loadAsync(Ionicons.font)]);
    const images = loadAssets([require('./s.png'), 'https://yt3.ggpht.com/IdRkd4wCZXxbxMG8mbWhCF7nxiypaO1w6EQ6RbtBn02R31MIY2z8FEqbHs0FDQERkBYqZlXAnFU=s48-c-k-c0x00ffffff-no-rj']);

    await Promise.all([...fonts, ...images])
  };


  useEffect(() => {
    try{
      startLoading().then( () => {
        onFinish();
      });
    }catch (err){
      console.warn(err) 
    }finally{
    }
  }, [])

  useEffect(()=>{
    if(isLoading){
      SplashScreen.hideAsync();
    }

  },[isLoading])
  


  // if(!isLoading){
  //   return (
  //     null
      // <View>
      //   <Text style={{color : "black"}}>{isLoading}</Text>
      //   </View>
      // <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />
    // );
  // }
// 
  // init db
  // fetch
  // noti
  // const [assets] = useAssets([require('./s.png'), 'https://yt3.ggpht.com/IdRkd4wCZXxbxMG8mbWhCF7nxiypaO1w6EQ6RbtBn02R31MIY2z8FEqbHs0FDQERkBYqZlXAnFU=s48-c-k-c0x00ffffff-no-rj']);
  // const [fonts] = Font.useFonts(Font.loadAsync(Ionicons.font));


  // if(!assets || fonts){
  //   return <AppLoading/>
  // }


  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <NavigationContainer>
      {/* <Tabs /> */}
        <Root />
    </NavigationContainer>
    </ThemeProvider>
  );
}
