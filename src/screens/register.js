import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: ""
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/backround.jpg')}
                    resizeMode='cover'
                    style={styles.cover}
                >
                    <Text style={styles.h1}> REGISTER </Text>
                    <TextInput
                        style={styles.formulario}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText={(text) => this.setState({ email: text })} //Onchangetext devuelve como parámetro el valor del input
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
                    <Text> {this.props.errores} </Text>
                    <TouchableOpacity style={styles.botonForm} onPress={() => this.props.route.params.onRegister(this.state.email, this.state.password, this.state.username)} disabled={this.state.email.length===0 || this.state.password.length===0 || this.state.username.length===0 ?true:false }>
                        <Text style={styles.textoBoton}> GO </Text>
                    </TouchableOpacity>
                </ImageBackground>
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
        backgroundColor: '#909f43',
    },
    botonForm: {
        backgroundColor: '#D5B895',
        borderWidth: 0,
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
    textoPass: {
        color: '#FFFFFF'
    },
    cover: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 400
    }
})

export default Register;
