//COMPONENTES REACT
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, Image, ActivityIndicator} from 'react-native';
import { clockRunning } from 'react-native-reanimated';

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
            error: 'Este usuario no realizo ningun posteo todavia'
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
    }
    render() {
        console.log(auth.currentUser)
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/backround.jpg')}
                    resizeMode='cover'
                    style={styles.cover}
                >
                    <View style={styles.infoUser}>
                        <View style={styles.topInfo}>
                            <Image
                                source={require('../../assets/pandora1.jpeg')}
                                resizeMode='contain'
                                style={styles.profilePic}
                            />
                            <View style={styles.nameAndEmail}>
                                <Text> {auth.currentUser.displayName} </Text>
                                <Text> {auth.currentUser.email} </Text>
                            </View>
                        </View>
                        <View style={styles.bottomInfo}>
                            <View style={styles.lastUsed}>
                                <Text>Last used: {auth.currentUser.metadata.lastSignInTime} </Text>
                                <Text>Posts: {this.state.posts.length} </Text>
                            </View>
                            <TouchableOpacity style={styles.logoutBoton} onPress={()=> this.props.route.params.onLogout()}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.posts}>
                    {this.state.cargando ?
                            <ActivityIndicator size='xlarge' color='green' />
                            :
                            this.state.posts.length === 0 ?
                            <Text>{this.state.error}</Text>
                            :
                            <FlatList
                                data={this.state.posts}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <Post info={item}></Post>}
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
    },
    posts: {
        backgroundColor: '#B87333',
        flex: 2,
        margin: 10
    },
    topInfo: {
        flex: 1,
        backgroundColor: '#8B0000',
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    bottomInfo: {
        flex: 2,
        backgroundColor: '#C2B280',
        marginTop: 10,
        margin: 5
    },
    nameAndEmail: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-between'
    },
    profilePic:{
        width: 100,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 50
    },
    logoutBoton:{
        textAlign: 'center',
        backgroundColor: '#33F8FF',
        borderWidth: 3,
        borderRadius: 4,
        borderColor: '#33D1FF',
        padding: 5,
        margin: 5
    },
    lastUsed:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

export default Profile;
