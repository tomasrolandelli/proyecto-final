//ELEMENTOS REACT
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ImageBackground } from 'react-native';

//SCREENS
import Post from '../components/Post';

//DB
import { db } from '../firebase/config';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            cargando: true
        }
    }
    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
        console.log(this.state.posts)
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/backround.jpg')}
                    resizeMode='cover'
                    style={styles.cover}
                >
                    <Text style={styles.titulo}>Petpix</Text>
                    <View style={styles.section}>
                        {this.state.cargando ?
                            <ActivityIndicator size='xlarge' color='green' />
                            :
                            <FlatList
                                data={this.state.posts}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <Post info={item} navigation={this.props.route.params.navigation}></Post>}
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
    titulo: {
        color: '#6F4E37',
        fontSize: 50,
        backgroundColor: '#FFFFFF',
        padding: 5,
        borderWidth: 2,
        borderColor: '#6F4E37',
        borderRadius: 4,
        margin: 5
    },
    section: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: 350,
    },
    cover: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 400
    }
})

export default Home;
