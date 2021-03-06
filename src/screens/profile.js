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
            modalVisible: false,
            docId: ""
        }
    }
    delete(){
        db.collection("posts").doc(this.state.docId).delete()
        this.setState({
            docId: "",
            modalVisible: false
        })
    }
    cancel(){
        this.setState({
            docId: "",
            modalVisible: false
        })
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
    toggleModal(id){
        this.setState({
            modalVisible: true,
            docId: id
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
                        transparent={false}
                        style={styles.modal}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.delete();
                        }}
                    >
                        <View style={styles.alert}>
                        <Text>Estas seguro de que quieres borrar este posteo?</Text>
                            <Pressable
                                style={[styles.button, styles.buttonAceptar]}
                                onPress={() => this.delete()}
                            >
                                <Text>Si</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.cancel()}
                            >
                                <Text>No</Text>
                            </Pressable>    
                        </View>

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
                                    renderItem={({ item }) => <Post toggleModal={(id)=>this.toggleModal(id)} valorBorrar={true} info={item} navigation={this.props.route.params.navigation}></Post>}
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
        flex: 2,
        margin: 10,
        justifyContent: 'center',
        textAlign: 'center'
    },
    topInfo: {
        flex: 1,
        backgroundColor: '#D5B895',
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
        backgroundColor: '#ADD8E6',
        borderWidth: 3,
        borderRadius: 4,
        borderColor: '#FFFFFF',
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

    },
    alert:{
        backgroundColor: 'white',
        position: "relative",
        top: 250,
        textAlign: 'center',

    },
    modal:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "rgba(83, 81, 87, 0.048)",
        margin: 50,

    },
    buttonAceptar:{
        backgroundColor: '#FF6666',
        color: '#FFFFFF',
        margin: 5,
        marginHorizontal: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#B34747',

    },
    buttonClose:{
        color: '#FFFFFF',
        backgroundColor: 'green',
        margin: 5,
        marginHorizontal: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'black'
    }
})

export default Profile;
