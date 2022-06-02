//ELEMENTOS REACT
import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//SCREENS
import Home from '../screens/Home'

//AUTH Y DB

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

                />
            </Tab.Navigator>
        )
    }
}
