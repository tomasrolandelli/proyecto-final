//ELEMENTOS REACT
import React, { Component } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//SCREENS
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import Create from '../screens/Create'


//ICONOS
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//TAB NAVIGATION
const Tab = createBottomTabNavigator()


export default class Tabnavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: true
        }
    }
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Entypo name="home" size={24} color="black" />
                    }}
                    initialParams={{
                        navigation: this.props.navigation
                    }}

                />
                <Tab.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
                        
                    }}
                    initialParams={{
                        onLogout: () => this.props.route.params.onLogout(),
                        navigation: this.props.navigation
                    }}

                />
                <Tab.Screen
                    name='Create'
                    component={Create}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <AntDesign name="pluscircle" size={24} color="black"/>, 
                        unmountOnBlur: true
                    }}
                    initialParams={{
                        navigation: this.props.navigation
                    }}
                />
                <Tab.Screen
                    name='Search'
                    component={Search}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />
                    }}
                />
            </Tab.Navigator>
        )
    }
}
