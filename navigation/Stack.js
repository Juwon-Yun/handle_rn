import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from "react-native";

const ScreenOne = ({navigation: {navigate}}) => <TouchableOpacity onPress={()=>navigate("Two")}>
    <Text>go to second screen</Text>
</TouchableOpacity>
const ScreenTwo = ({navigation: {navigate}}) => <TouchableOpacity onPress={()=>navigate("Three")}>
<Text>go to thrird screen</Text>
</TouchableOpacity>
const ScreenThree = ({navigation: {navigate, goBack, setOptions}}) => <TouchableOpacity onPress={()=> {
    // goBack()
    // return setOptions({title : "third screen"})
    return navigate("Tabs", {screen : "Search"})
    }}>
<Text>go to Search</Text>
</TouchableOpacity>

const NativeStack = createNativeStackNavigator();

const Stack = () =>( 
<NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne}/>
    <NativeStack.Screen name="Two" component={ScreenTwo}/>
    <NativeStack.Screen name="Three" component={ScreenThree}/>
</NativeStack.Navigator>)

export default Stack;