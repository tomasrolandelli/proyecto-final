import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {}
    }
    render() {
        return (
            <View>
                <Text>
                    Esta es la página de Login
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Login;
