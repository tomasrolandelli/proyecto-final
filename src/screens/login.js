import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            email: "",
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
                    <Text style={styles.h1}> Login:  </Text>
                    <TextInput
                        style={styles.formulario}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <TextInput
                        style={styles.formulario}
                        keyboardType='default'
                        placeholder='password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                    <Text> {this.props.errores} </Text>
                    <TouchableOpacity style={styles.botonForm} onPress={() => this.props.route.params.onLogin(this.state.email, this.state.password)} disabled={this.state.email.length===0 || this.state.password.length===0 ?true:false } >
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
        backgroundColor: '#909f43'
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
    cover:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 400
    }
})

export default Login;
