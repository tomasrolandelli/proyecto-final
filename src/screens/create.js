//COMPONENTES REACT
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground } from 'react-native';

//AUTH Y DB
import { db, auth } from '../firebase/config';

//COMPONENTS
import MyCamera from '../components/MyCamera';

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            texto: '',
            messageState: false,
            mostrarComponenteCamara: true,
            urlPhoto: ''
        }
    }
    onSubmitPost(texto) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: texto,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.urlPhoto

        })
            .then((response) => {
                this.setState({
                    messageState: true,
                    mostrarComponenteCamara: true
                })
            })
            .catch((error) => console.log(error))
    }
    onPhotoSubmit(url) {
        console.log(url)
        this.setState({
            mostrarComponenteCamara: false,
            urlPhoto: url
        })
    }
    render() {
        return (
            <>
                {
                    this.state.mostrarComponenteCamara
                        ?
                        <MyCamera onPhotoSubmit={(url)=>this.onPhotoSubmit(url)}/>
                        :
                        <View style={styles.container}>
                            <ImageBackground
                                source={require('../../assets/backround.jpg')}
                                resizeMode='cover'
                                style={styles.cover}
                            >
                                <Text>Agregar post:</Text>
                                <TextInput
                                    style={styles.formulario}
                                    keyboardType='default'
                                    placeholder='description'
                                    value={this.state.texto}
                                    onChangeText={(text) => this.setState({ texto: text })}
                                />
                                <TouchableOpacity onPress={() => {
                                    this.onSubmitPost(this.state.texto)
                                    this.setState({ texto: '' })
                                }} style={styles.botonForm}>
                                    <Text style={styles.textoBoton}>GO</Text>
                                </TouchableOpacity>
                                {this.state.messageState ?
                                    <Text>El posteo fue exitoso</Text>
                                    :
                                    null}
                            </ImageBackground>
                        </View>
                }

            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#909f43',
        justifyContent: 'center'
    },
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
    cover: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 400
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
        color: '#FFFFFF'
    },

})

export default Create;
