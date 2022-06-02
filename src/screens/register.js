import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

class Register extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}> REGISTER </Text>
                <TextInput
                    style={styles.formulario}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.formulario}
                    keyboardType='default'
                    placeholder='username'
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <Text style={styles.textoPass}>Password must be at least 6 characters long</Text>
                <TextInput
                    style={styles.formulario}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <TouchableOpacity style={styles.botonForm} onPress={() => this.props.route.params.onRegister(this.state.email, this.state.password, this.state.username)}>
                    <Text style={styles.textoBoton}> GO </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFFFFF',
        width: 300,
        height: 50,
        textAlign: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 4
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AC4040'
    },
    botonForm: {
        backgroundColor: '#030303',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        padding: 5,
        margin: 10
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 'large'
    },
    h1: {
        color: '#FFFFFF',
        fontSize: 50,
        textAlign: 'center'
    },
    textoPass:{
        color: '#FFFFFF'
    }
})

export default Register;
