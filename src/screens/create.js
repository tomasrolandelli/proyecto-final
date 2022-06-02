//COMPONENTES REACT
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';

//AUTH Y DB
import { db, auth } from '../firebase/config';



class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            texto: '',
            messageState: false
        }
    }
    onSubmitPost(texto) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: texto,
            createdAt: Date.now(),
            likes: [],
            comments: []

        })
            .then((response) => {
                this.setState({
                    messageState: true
                })
            })
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Agregar post:</Text>
                <TextInput
                    style={styles.formulario}
                    keyboardType='default'
                    placeholder='description'
                    value={this.state.texto}
                    onChangeText={(text) => this.setState({ texto: text })}
                />
                <TouchableOpacity onPress={()=>{
                    this.onSubmitPost(this.state.texto)
                    this.setState({ texto: ''})
                    }}>
                    <Text>GO</Text>
                </TouchableOpacity>
                {this.state.messageState ?
                    <Text>El posteo fue exitoso</Text>
                    :
                    null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#AC4040',
        justifyContent: 'center'
    }, formulario: {
        backgroundColor: '#FFFFFF',
        width: 300,
        height: 50,
        textAlign: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 4
    }
})

export default Create;
