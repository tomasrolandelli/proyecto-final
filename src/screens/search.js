import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            texto: '',
            usuario:'',
            posteos:[],
            active: false
        }
    }
    
    buscador(usuario){
        db.collection('posts').where('owner', '==', usuario).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts,
                        active: true
                    })
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/backround.jpg')}
                    resizeMode='cover'
                    style={styles.cover}
                >
                    <View style={styles.section1}>
                        <Text>Search</Text>
                        <TextInput
                            keyboardType='default'
                            placeholder='usuario@example.com'
                            value={this.state.texto}
                            onChangeText={(text) => this.setState({ texto: text })}
                            style={styles.formulario}
                        />
                        <TouchableOpacity style={styles.botonForm} onPress={()=>this.buscador(this.state.texto)}>
                            <Text style={styles.textoBoton}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.active ?
                    <View style={styles.section2}>
                        <Text>Resultados de: {this.state.texto}</Text>
                        <FlatList
                            data={this.state.posteos}
                            keyExtractor={(item)=> item.id.toString()}
                            renderItem={({item}) => <Post info={item}></Post>}
                        />
                    </View>
                        :
                        null
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#909f43',
    },
    cover: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        minWidth: 400
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
    section1:{
        backgroundColor:'red',
        flex: 1
    },
    section2:{
        backgroundColor: 'black',
        flex: 2
    }
})

export default Search;
