import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native'

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
                <Text style={styles.titulo}>[NOMBRE]</Text>
                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.textoBoton}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.textoBoton}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AC4040'
    },
    titulo:{
        color: '#FFFFFF',
        fontSize: 50
    },
    boton:{
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
    textoBoton:{
        color: '#FFFFFF'
    }
})
