import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image} from 'react-native';

//https://docs.expo.dev/guides/icons/
import * as Font from 'expo-font';
import {Ionicons} from "@expo/vector-icons"
import {Asset} from 'expo-asset';

// import * as SplashScreen from 'expo-splash-screen';


// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = () => setIsLoading(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font)

    // 2 type preload : local assets or assets API
    await Asset.loadAsync(require('./s.png'));

    await Image.prefetch('https://yt3.ggpht.com/IdRkd4wCZXxbxMG8mbWhCF7nxiypaO1w6EQ6RbtBn02R31MIY2z8FEqbHs0FDQERkBYqZlXAnFU=s48-c-k-c0x00ffffff-no-rj')
  };

  if(!isLoading){
    return (
      <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />
    );
  }
  return (
  <SafeAreaView>
    <View>
      <Text>
        Loading Done
      </Text>
    </View>
  </SafeAreaView>
  );
}

