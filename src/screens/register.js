import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            username: "",
            password: ""
        }
    }
    render() {
        return (
            <View>
                <TextInput onChangeText={(text)=> this.setState({username: text })} placeholder="Nombre de Usuario" keyboardType='default' value={this.state.username}/>
                <TextInput onChangeText={(text)=> this.setState({email: text })} placeholder="Email" keyboardType='email-adress' value={this.state.email}/>
                <TextInput onChangeText={(text)=> this.setState({password: text })} placeholder="Contraseña" keyboardType='default' value={this.state.password} secureTextEntry={true}/>
                <TouchableOpacity onPress={()=> this.props.route.params.registro(this.state.email, this.state.password)}>
                    <Text>
                        Registrarse
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Register;
