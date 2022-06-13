import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Comment from '../components/Comment';

class Comments extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments:[],
            newComment: '',
            error: ''
        }
    }

    componentDidMount(){
        const id = this.props.route.params.id
        db.collection('posts').doc(id).onSnapshot(
            
            (doc) => {
                this.setState({
                    comments: doc.data().comments
                })
            }
        )
        
    }

    onSubmit(text){
        const comments = {
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            desc: text
        }
        if (text.length === 0){
            this.setState({error: 'El comentario no puede estar vacio'})
            return false
        }
        db.collection('posts').doc(this.props.route.params.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(comments) 
        })
        .then((response) => this.setState({newComment: '', error: ''}))
        .catch((err) => console.log(err))
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/backround.jpg')}
                    resizeMode='cover'
                    style={styles.cover}>
                        { this.state.comments.length === 0 ?
                        <View style={styles.section1}>
                            <Text>Aún no hay comentarios. Sé el primero en opinar.</Text>
                       </View>
                       : 
                       <View style={styles.section1}>

                           <FlatList
                           
                           data={this.state.comments}
                           keyExtractor={(item)=> item.createdAt.toString()}
                           renderItem={({item})=> <Comment info={item}/> }
                           />
                           
                       </View>
                        } 
                        <View style={styles.section2}>
                            {
                                this.state.error !== '' ?
                                <Text>{this.state.error}</Text>
                                :
                                null
                            }
                            <TextInput
                            style={styles.input}
                            keyboardType='default'
                            placeholder='Deja tu comentario'
                            value={this.state.newComment}
                            onChangeText={(text) => this.setState({newComment: text})}/>
                            <TouchableOpacity style={styles.boton} onPress={()=>this.onSubmit(this.state.newComment)}>
                                <Text style={styles.textoBoton}>
                                    Comentar
                                </Text>
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
        backgroundColor: '#909f43',
    },
    cover: {
        flex: 1,
        backgroundColor: '#fff',
        minWidth: 400
    },
    section1: {
        flex: 5,
        backgroundColor: 'white',
        margin: 20,
    
    },
    section2: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: 'center',
    },
    input: {
        textAlign: 'center',
        flex: 1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 100

    },
    boton: {
        textAlign: 'center',
        flex: 1,
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: 'green',
        marginVertical: 5,
        justifyContent: 'center',
        marginHorizontal: 100

    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 'large'
    }

})

export default Comments