import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, useState } from "react-native"
import { app_auth } from '../../../firebaseConfig'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { pickImage } from "../../utils/imageUpload"



export function ActionModal({ handleActionOff, handleAction, navigation, handleName, userImage }){

    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={{ backgroundColor: "rgba(0,0,0,0.08)", justifyContent: 'flex-end', borderRadius: 10}} >
                <View style={styles.content} >
                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => pickImage(userImage)} >
                        <Text style={styles.action} >Alterar Foto</Text>
                        <Feather color="#505050" name="camera" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleName} >
                        <Text style={styles.action} >Alterar Nome</Text>
                        <Feather color="#505050" name="edit" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={ () => {handleAction(); navigation.navigate('Configs')}}>
                        <Text style={styles.action} >Configurações</Text>
                        <Feather color="#505050" name="settings" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.leave} activeOpacity={0.9} onPress={() => {handleActionOff()}} >
                        <Text style={styles.action} >Sair</Text>
                        <Feather color="#505050" name="log-out" size={26} />
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1

    },
    content:{
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 35,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 6,
    },
    button:{
        zIndex: 99,
        backgroundColor: "#FFF",
        borderRadius: 15,
        marginTop: 25,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#3B98EF",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    action:{
        fontSize: 20,
        fontWeight: '600',
        color: "#505050"
    },
    leave:{
        zIndex: 99,
        backgroundColor: "#FFF",
        borderRadius: 15,
        marginTop: 25,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#FA787D",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    }

})


