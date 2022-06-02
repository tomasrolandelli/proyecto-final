//ELEMENTOS REACT
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native';

//DB Y AUTH
import { db, auth } from '../firebase/config';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                })
            }
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Holu</Text>
                <View style={styles.section}>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.card}>
                                <Text>{item.data.owner}</Text>
                                <Image
                                    style={styles.postImage}
                                    source={require('../../assets/icon.png')}
                                />
                                <Text>{item.data.description}</Text>

                            </View>}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#AC4040'
    },
    titulo: {
        fontSize: 50
    },
    section: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0000FF',
        width: 350,
    },
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
    }
})

export default Home;
