//ELEMENTOS REACT
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//SCREENS
import Register from '../screens/Register';
import Login from '../screens/Login';
import TabNavigation from '../nav/TabNavigation';
import Landpage from '../screens/Landpage';

//AUTH Y DB
import { auth, db } from '../firebase/config';
import { set } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();


class Menu extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            errorLogin: '',
            errorRegister: ''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            if(user){
                this.setState({loggedIn: true })
            }
        })
    }
    onLogin(email, pass) {

        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({ loggedIn: true, email: email })
            })
            .catch((error) => {
               // this.setState({ errorLogin: error.message})
               console.log(error)
            })
    }
    onRegister(email, pass, user) {

        auth.createUserWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({ loggedIn: true })
                auth.currentUser.updateProfile({displayName: user})
                db.collection('users').add({
                    email: email,
                    username: user,
                    createdAt: Date.now()
                })
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err))
            })
            .catch(error => {
                this.setState({ errorRegister: error.message })
                console.error(error)
            })
    }
    onLogout() {
        auth.signOut()
            .then(response => this.setState({
                loggedIn: false
            }))
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
                                children={ (props) => <Login errores={this.state.errorLogin} { ...props} /> }
                                options={{
                                    headerStyle: {
                                        backgroundColor: '#6F4E37'
                                    },
                                    headerTintColor:'#FFFFFF'
                                }}
                                initialParams={{
                                    onLogin: (email, pass) => this.onLogin(email, pass)
                                }}
                            />
                            <Stack.Screen
                                name='Register'
                                children={ (props) => <Register errores={this.state.errorRegister} { ...props} /> }
                                options={{
                                    headerStyle: {
                                        backgroundColor: '#6F4E37'
                                    },
                                    headerTintColor:'#FFFFFF'
                                }}
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
