//ELEMENTOS REACT
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
            arrComments: []
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
    render() {
        //INFO DEL POST
        const info = this.props.info.data
        return (
            <View style={styles.card}>
                <Text>{info.owner}</Text>
                <Image
                    style={styles.postImage}
                    source={require('../../assets/icon.png')}
                />
                <Text>{info.description}</Text>
                <View style={styles.divLikes}>
                    <Text>{this.state.cantLikes}</Text>
                    {
                        this.state.miLike?
                            <TouchableOpacity onPress={() => this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red' />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' />
                            </TouchableOpacity>

                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        height: 300,
        width: 340,
        margin: 5,
        alignSelf: 'center'

    },
    postImage: {
        width: 300,
        height: 200
    },
    divLikes: {
        backgroundColor: '#C9E1BE',
        display: 'flex',
    }
})
