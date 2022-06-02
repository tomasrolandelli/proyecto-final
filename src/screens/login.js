import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
    }
    render() {
        return (
            <View>
                <TextInput onChangeText={(text)=> this.setState({email: text })} placeholder="Email" keyboardType='email-adress' value={this.state.email} />
                <TextInput onChangeText={(text)=> this.setState({password: text })} placeholder="Contraseña" keyboardType='default' value={this.state.password} secureTextEntry={true} />
                <TouchableOpacity>
                    <Text>
                        Ingresar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Login;
