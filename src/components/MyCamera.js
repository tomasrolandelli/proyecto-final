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
            .then((response) => this.setState({ permission: true, urlFoto:'' }))
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
        fetch(this.state.urlFoto) //normalmente haríamos un response.json
        .then((res)=>res.blob()) // Binary Large Object. Para trabajar con la url de materiales audiovisuales
        .then((image)=>{
            const ref = storage.ref(`photos/${Date.now()}.jpg`) //ref es un método de referencia //alamacena la foto con un nuevo nombre
            ref.put(image) //sube datos al almacenamiento de la ref
                .then(()=>{
                    ref.getDownloadURL()
                        .then((url)=>{
                        this.props.onPhotoSubmit(url)
                        })
                })
                .catch((err)=>console.log(err))
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
                            <View style={styles.confirmarFoto}>
                                <Image
                                    style={styles.picture}
                                    source={{ uri: this.state.urlFoto }}
                                />
                                <View style={styles.buttons}>
                                    <TouchableOpacity style={styles.botonAceptar} onPress={()=>this.acceptPhoto()}>
                                        <Text>Aceptar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonRechazar} onPress={()=>this.declinePhoto()}>
                                        <Text>Rechazar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <>
                                <Camera
                                    style={styles.camera}
                                    type={Camera.Constants.Type.back}
                                    ref={(metodos) => this.metodosDeCamara = metodos}
                                />
                                <View style={styles.buttons}>
                                    <TouchableOpacity style={styles.botonTomarFoto} onPress={() => this.takePhoto()}>
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
        flex: 8,
        borderWidth: 2,
        borderColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#909f43',

    },
    buttons: {
        flex: 1
    },
    errorMessage:{
        backgroundColor: 'black',
        color: 'red',
        fontSize: 20
    },
    picture:{
        flex: 1,
        borderWidth: 2,
        borderColor: 'white'
    },
    botonAceptar:{
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: 'green',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 5
    },
    botonRechazar:{
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: 'red',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 5

    },
    confirmarFoto:{
        flex: 1,
        justifyContent: 'center',
        margin: 30
    },
    botonTomarFoto:{
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: 'green',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 5 
    }

})
