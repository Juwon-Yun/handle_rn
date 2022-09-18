import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { View, Text} from 'react-native';
import Movie from '../screens/Movie';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

// https://reactnavigation.org/docs/tab-based-navigation

const Tab = createBottomTabNavigator();

const Tabs = () => (
<Tab.Navigator 
    initialRouteName='Movie'
    screenOptions={{
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
</Tab.Navigator>);

export default Tabs;