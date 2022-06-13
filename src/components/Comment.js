import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Comment extends Component {
  constructor(props){
      super(props)
      this.state = {
          value: 0
      }
  }

    render() {
    return (
      <View style={styles.container}>
          <Text style={styles.owner}>{this.props.info.owner}</Text>
          <Text style={styles.desc}>{this.props.info.desc}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1
    },
    owner:{
        fontWeight: 'bold'
    },
    desc: {

    },
})