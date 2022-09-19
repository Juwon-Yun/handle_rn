import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { View, Text, useColorScheme} from 'react-native';
import { BLACK_COLOR, YELLOW_COLOR } from '../constants/colors';
import Movie from '../screens/Movie';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

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
      <Tab.Screen name='Movie' component={Movie}/>
      <Tab.Screen name='Tv' component={Tv}
        options={{
      //     tabBarLabelStyle:{
      //         backgroundColor : 'red'
      //     }
          // tabBarBadge : 190
        }}
      />
      <Tab.Screen name='Search' component={Search}/>
    </Tab.Navigator>)
    }

export default Tabs;