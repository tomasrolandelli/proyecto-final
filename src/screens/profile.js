//COMPONENTES REACT
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, Image, ActivityIndicator, Modal, Alert, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


//AUTH Y DB
import { auth, db } from '../firebase/config';

//COMPONENTE POST
import Post from '../components/Post';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            cargando: true,
            posts: [],
            error: 'Este usuario no realizo ningun posteo todavia :(',
            user: {},
            modalVisible: false
        }
    }
    componentDidMount() {
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    cargando: false
                })

            }
        )
        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        user: doc.data()
                    })
                })
            }
        )

    }
    toggleModal(){
        this.setState({
            modalVisible: true
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/backround.jpg')}
                    resizeMode='cover'
                    style={styles.cover}
                >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <Text>Estas seguro de que quieres borrar este posteo?</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.setModalVisible(!modalVisible)}
                        >
                            <Text>si</Text>
                        </Pressable>
                    </Modal>
                    <View style={styles.infoUser}>
                        <View style={styles.topInfo}>
                            {/* <Image
                                source={require('../../assets/pandora1.jpeg')}
                                resizeMode='contain'
                                style={styles.profilePic}
                            /> */}
                            <FontAwesome name="user" size={45} color="black" />
                            <View style={styles.nameAndEmail}>
                                <Text> {this.state.user.username}</Text>
                                <Text> {auth.currentUser.email} </Text>
                            </View>
                        </View>
                        <View style={styles.bottomInfo}>
                            <View style={styles.lastUsed}>
                                <Text>Last used: {auth.currentUser.metadata.lastSignInTime} </Text>
                                <Text>Posts: {this.state.posts.length} </Text>
                            </View>
                            <TouchableOpacity style={styles.logoutBoton} onPress={() => this.props.route.params.onLogout()}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.posts}>
                        {this.state.cargando ?
                            <ActivityIndicator size='xlarge' color='green' />
                            :
                            this.state.posts.length === 0 ?
                                <Text style={styles.error}>{this.state.error}</Text>
                                :
                                <FlatList
                                    data={this.state.posts}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => <Post toggleModal={()=>this.toggleModal()} valorBorrar={true} info={item}></Post>}
                                />
                        }
                    </View>
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
        minWidth: 400
    },
    infoUser: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        margin: 10,
        borderWidth: 2,
        borderColor: '#6F4E37'
    },
    posts: {
        backgroundColor: '#B87333',
        flex: 2,
        margin: 10,
        justifyContent: 'center',
        textAlign: 'center'
    },
    topInfo: {
        flex: 1,
        backgroundColor: '#8B0000',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    bottomInfo: {
        flex: 2,
        marginTop: 10,
        margin: 5,
        justifyContent: 'space-evenly'
    },
    nameAndEmail: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-between',
        marginLeft: 20
    },
    profilePic: {
        width: 100,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 50
    },
    logoutBoton: {
        textAlign: 'center',
        backgroundColor: '#33F8FF',
        borderWidth: 3,
        borderRadius: 4,
        borderColor: '#33D1FF',
        padding: 5,
        margin: 5
    },
    lastUsed: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    error: {
        fontWeight: 'bold',

    }
})

export default Profile;
