import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Register from '../screens/register'
import Login from '../screens/login'
const Tabs = createBottomTabNavigator()
import {auth} from '../firebase/config'

class Menu extends Component {
    constructor(){
        super()
        this.state = {}
    }
    register(email, password){
        console.log(email)
        console.log(password)
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=>{
            console.log(auth.currentUser)
        })
    }
    render() {
        return (
            <NavigationContainer>
                <Tabs.Navigator>
                    <Tabs.Screen name="Register" component={ Register } initialParams={{registro: (email, password)=> this.register(email, password) }}/>
                    <Tabs.Screen name="Login" component={ Login }/>
                </Tabs.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({})

export default Menu;
