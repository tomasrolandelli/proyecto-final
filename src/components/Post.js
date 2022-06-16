//ELEMENTOS REACT
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

//FIREBASE
import firebase from 'firebase'

//AUTH Y DB
import { auth, db } from '../firebase/config'

//ICONO CORAZON
import { FontAwesome } from '@expo/vector-icons'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            miLike: false,
            cantLikes: 0,
            arrLikes: [],
            arrComments: [],
            valorBorrar: this.props.valorBorrar
        }
    }
    componentDidMount() {
        const documento = this.props.info.data
        const estaMiLike = documento.likes.includes(auth.currentUser.email)

        if (documento.likes) {
            this.setState({
                cantLikes: documento.likes.length
            })
        }

        if (estaMiLike) {
            this.setState({
                miLike: true
            })
        }
    }
    like() {
        const post = this.props.info
        db.collection('posts').doc(post.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    miLike: true,
                    cantLikes: this.state.cantLikes + 1
                })
            })
            .catch((error) => console.log(error))
    }

    unlike() {
        this.setState({
            miLike: false,
            cantLikes: this.state.cantLikes - 1
        })
    }
    onDelete() {
        db.collection('posts').doc(this.props.info.id).delete()
    }
    render() {
        //INFO DEL POST
        const info = this.props.info.data
        return (
            <View style={styles.card}>
                {
                    this.state.valorBorrar ?
                        <TouchableOpacity onPress={() => this.props.toggleModal()}>
                            <Text>Borrar</Text>
                        </TouchableOpacity>
                        :
                        null
                }
                <Text style={styles.poster}>{info.owner}</Text>
                <Image
                    style={styles.postImage}
                    source={{ uri: info.photo }}
                    resizeMode='contain'
                />
                <View style={styles.base}>
                    <Text style={styles.description}>{info.description}</Text>
                    <TouchableOpacity style={styles.botonComentar} onPress={() => this.props.navigation.navigate('Comments', { id: this.props.info.id })}>
                        <Text style={styles.textoComentar}>Comentarios</Text>
                    </TouchableOpacity>
                    <View style={styles.divLikes}>
                        {
                            this.state.miLike ?
                                <TouchableOpacity style={styles.botonLike} onPress={() => this.unlike()}>
                                    <Text style={styles.textoLike}>Unlike</Text>
                                    <FontAwesome name='heart' size={24} color='red' />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.botonLike} onPress={() => this.like()}>
                                    <Text style={styles.textoLike}>Like</Text>
                                    <FontAwesome name='heart-o' size={24} color='black' />
                                </TouchableOpacity>

                        }
                        <Text>{this.state.cantLikes}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        height: 310,
        width: 340,
        margin: 5,
        alignSelf: 'center',
        display: 'flex',
        borderWidth: 2,
        borderRadius: 4
    },
    postImage: {
        width: 320,
        height: 200,
        alignSelf: 'center',
        borderWidth: 2,

    },
    divLikes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
        },
    poster: {
        margin: 5
    },
    base: {
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    botonLike:{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5

    },
    textoLike:{
        paddingHorizontal: 5
    },
    description:{
        borderBottomWidth: 2
    },
    botonComentar:{

    },
    textoComentar:{
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})
