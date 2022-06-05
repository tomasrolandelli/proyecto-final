import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native'

export default class Landpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valor: 0
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
                    <Text style={styles.titulo}>Petpix</Text>
                    <Text style={styles.subtitulo}>Bienvenido a la primer red social de mascotas</Text>
                    <View style={styles.containerBotones}>
                        <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.textoBoton}>login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.textoBoton}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#909f43',
    },
    titulo: {
        color: '#6F4E37',
        fontSize: 50,
        backgroundColor:'#FFFFFF',
        padding: 5,
        borderWidth: 2,
        borderColor:'#6F4E37',
        borderRadius:4
    },
    subtitulo: {
        color: '#FFFFFF',
        fontSize: 15,
        backgroundColor: '#6F4E37',
        margin: 10
    },
    boton: {
        backgroundColor: '#030303',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        padding: 5,
        margin: 10

    },
    textoBoton: {
        color: '#FFFFFF'
    },
    containerBotones: {
        display: 'flex',
        flexDirection: 'row',
        margin: 15,
        width: 350,
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    cover:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 400
    }
})
