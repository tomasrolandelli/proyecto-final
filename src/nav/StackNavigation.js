//ELEMENTOS REACT
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//SCREENS
import Register from '../screens/Register'
import Login from '../screens/Login'
import TabNavigation from '../nav/TabNavigation'
import Landpage from '../screens/Landpage';

//AUTH Y DB
import { auth, db } from '../firebase/config';

const Stack = createNativeStackNavigator();


class Menu extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: true,
            error: ''
        }
    }
    onLogin(email, pass) {

        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({ loggedIn: true, email: email })
            })
            .catch((error) => {
                this.setState({ error: 'Credenciales invalidas' })
            })
    }
    onRegister(email, pass, user) {

        auth.createUserWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({ loggedIn: true })
                db.collection('users').add({
                    email: email,
                    password: pass,
                    username: user,
                    createdAt: Date.now()
                })
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err))
            })
            .catch(error => {
                this.setState({ error: 'Fallo en el registro.' })
                console.error(error)
            })
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {this.state.loggedIn ?
                        <Stack.Screen
                            name='Tab'
                            component={TabNavigation}
                            options={{ headerShown: false }}
                            initialParams={{
                                onLogout: () => this.onLogout()
                            }}
                        />
                        :
                        <Stack.Group>
                            <Stack.Screen
                                name='Landpage'
                                component={Landpage}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name='Login'
                                component={Login}
                                options={{
                                    headerStyle: {
                                        backgroundColor: '#f4511e'
                                    },
                                    headerTintColor:'#FFFFFF'
                                }}
                                initialParams={{
                                    onLogin: (email, pass) => this.onLogin(email, pass)
                                }}
                            />
                            <Stack.Screen
                                name='Register'
                                component={Register}
                                initialParams={{
                                    onRegister: (email, pass, user) => this.onRegister(email, pass, user)
                                }}
                            />
                        </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


export default Menu;
