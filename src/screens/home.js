import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Home extends Component {
    constructor(){
        super()
        this.state = {}
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Holu</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AC4040'
    }
})

export default Home;
