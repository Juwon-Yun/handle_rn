import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

const Tabs = () => <Tab.Navigator>
    <Tab.Screen name='Movie' component={}/>
    <Tab.Screen name='Tv' component={}/>
    <Tab.Screen name='Search' component={}/>
</Tab.Navigator>

export default Tabs;