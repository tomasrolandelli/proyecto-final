//ELEMENTOS REACT
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';

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
        db.collection('posts').onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        cargando: false
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
                    {this.state.cargando ?
                        <ActivityIndicator size='xlarge' color='green' />
                        :
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <Post info={item}></Post>}
                        />
                    }
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
    }
})

export default Home;
