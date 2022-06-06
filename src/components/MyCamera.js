//ELEMENTOS REACT
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

//STORAGE
import { storage } from '../firebase/config'

export default class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCamera: true,
            permission: false,
            urlFoto: ''
        }
        this.metodosDeCamara = undefined
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then((response) => this.setState({ permission: true }))
            .catch((error) => console.log(error))
    }
    takePhoto() {
        this.metodosDeCamara.takePictureAsync()
            .then((photo) => {
                this.setState({
                    urlFoto: photo.uri,
                    showCamera: false
                })
            })
            .catch((error) => console.log(error))
    }

    declinePhoto(){
        this.setState({
            urlFoto:'',
            showCamera: true
        })
    }
    acceptPhoto(){
        fetch(this.state.urlFoto)
        .then((res)=>res.blob())
        .then((image)=>{
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
                .then(()=>{
                    ref.getDownloadURL()
                        .then((url)=>{
                        this.props.onPhotoSubmit(url)
                        })
                })
        })
        .catch((error)=>console.log(error))
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.permission
                        ?
                        this.state.showCamera === false
                            ?
                            <>
                                <Text>Aqui vamos a mostrar la imagen, aceptar y rechazar</Text>
                                <Image
                                    style={styles.picture}
                                    source={{ uri: this.state.urlFoto }}
                                />
                                <View style={styles.buttons}>
                                    <TouchableOpacity onPress={()=>this.acceptPhoto()}>
                                        <Text>Aceptar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.declinePhoto()}>
                                        <Text>Rechazar</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            <>
                                <Camera
                                    style={styles.camera}
                                    type={Camera.Constants.Type.back}
                                    ref={(metodos) => this.metodosDeCamara = metodos}
                                />
                                <View style={styles.buttons}>
                                    <TouchableOpacity onPress={() => this.takePhoto()}>
                                        <Text>Tomar la foto</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        :
                        <Text style={styles.errorMessage}>No tenes permiso para usar la camara</Text>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    camera: {
        flex: 8
    },
    container: {
        flex: 1,

    },
    buttons: {
        flex: 1
    },
    errorMessage:{
        backgroundColor: 'black',
        color: 'red',
        fontSize: 20
    }

})
