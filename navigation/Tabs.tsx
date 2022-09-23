import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { View, Text, useColorScheme} from 'react-native';
import { BLACK_COLOR, YELLOW_COLOR } from '../constants/colors';
import Movie from '../screens/Movie';
import Search from '../screens/Search';
import Tv from '../screens/Tv';
import {Ionicons} from "@expo/vector-icons"
import Stack from './Stack';

// https://reactnavigation.org/docs/tab-based-navigation

const Tab = createBottomTabNavigator();

const Tabs = () => {
  // cmd + shift + a
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator 
      initialRouteName='Movie'
      screenOptions={{
        tabBarStyle:{
          backgroundColor : isDark ? BLACK_COLOR : 'white'
        },
        tabBarActiveTintColor : isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor : isDark ? '#d2dae2' : '#d2dae2',
        headerStyle : {
          backgroundColor : isDark ? BLACK_COLOR : 'white'
        },
        headerTitleStyle : {
          color : isDark ? YELLOW_COLOR : 'black'
        },
        tabBarLabelStyle : {
          fontSize : 12,
          fontWeight : "600",
          marginTop: -5,
        }
      //     tabBarLabelStyle:{ 
      //         backgroundColor : 'red'
      //     }
          // tabBarLabelPosition:'beside-icon'
          // tabBarActiveTintColor : 'red',
          // tabBarInactiveTintColor : 'purple'
          // tabBarStyle: {
          //     backgroundColor : 'tomato'
          // }
          // headerTitleStyle : {
          //     color : 'tomato',
          //     backgroundColor : 'black'
          // },
          // headerRight : () => (<View><Text>HeaderRight</Text></View>),
      }}
      >
      <Tab.Screen
        name='Movie' 
        component={Movie} 
        options={{
          tabBarIcon: ({focused, color, size}) => {
              // console.log(focused, color, size)
              return <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />
          }, 
          // headerShown : false,
        }}
        />
      <Tab.Screen name='TV' component={Tv}
        options={{
          tabBarIcon: ({focused, color, size}) => {
              // console.log(focused, color, size)
              return <Ionicons name="tv" size={size} color={color} />
          }
          
          //     tabBarLabelStyle:{
      //         backgroundColor : 'red'
      //     }
          // tabBarBadge : 190
        }}
      />
      <Tab.Screen name='Search' component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => {
              // console.log(focused, color, size)
              return <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>)
    }

export default Tabs;