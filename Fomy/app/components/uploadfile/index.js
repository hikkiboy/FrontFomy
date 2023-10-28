import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { app_auth, app_DB, firebase } from '../../../config';
import React, { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { doc, updateDoc } from "firebase/firestore";



const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        // nenhuma permissão é pedida para executar essa livraria
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });

    if (!result.canceled){
        setImage(result.assets[0].uri);
    }

    };

    // Upload media files

    const uploadMedia = async () => {
        setUploading(true);

    

    try {
        const { uri } = await FileSystem.getInfoAsync(image);
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (e) => {
                reject(new TypeError('Pedido de network falhou'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        


        const filename = image.substring(image.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(filename);
        await ref.put(blob);
        setUploading(false);
        Alert.alert('Foto enviada!!');
        setImage(null);

        // Atualiza o BD com o nome da foto
        /* const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
        await updateDoc(userRef, {
            Foto: "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/"+filename
        }); */

        console.log(filename)
        console.log(ref)
        
        
    }
    catch (error) {
        console.error(error);
        setUploading(false);
    };
 
};

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.action}>Selecione uma imagem</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image}}
                    style={{width: 300, height: 300}}
                />}
            
            <TouchableOpacity style={styles.button} onPress={uploadMedia}>
                <Text style={styles.action}>Upload</Text>
            </TouchableOpacity>
            
            </View>


        </SafeAreaView>
    )
}

export default UploadMediaFile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    button:{
        zIndex: 99,
        backgroundColor: "#7EB77F",
        borderRadius: 15,
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderBottomWidth: 6,
        borderColor: "#427643"
    },
    action:{
        fontSize: 18,
        fontWeight: '600'
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    }
})
