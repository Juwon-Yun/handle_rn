import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { SafeAreaView, View, Text} from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';


// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = () => setIsLoading(true);
  const startLoading = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
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

