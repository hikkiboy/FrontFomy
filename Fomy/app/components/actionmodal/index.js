import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, useState } from "react-native"
import { app_auth } from '../../../firebaseConfig'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from "@react-native-async-storage/async-storage"



export function ActionModal({ handleActionOff, handleAction, navigation, handleName, pickIt }){

    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={{ backgroundColor: "rgba(0,0,0,0.08)", justifyContent: 'flex-end', borderRadius: 10}} >
                <View style={styles.content} >
                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={pickIt} >
                        <Text style={styles.action} >Alterar Foto</Text>
                        <Feather name="camera" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleName} >
                        <Text style={styles.action} >Alterar Nome</Text>
                        <Feather name="edit" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={ () => {handleAction(); navigation.navigate('Configs')}}>
                        <Text style={styles.action} >Configurações</Text>
                        <Feather name="settings" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.leave} activeOpacity={0.9} onPress={() => {handleActionOff()}} >
                        <Text style={styles.action} >Sair</Text>
                        <Feather name="log-out" size={26} />
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
        borderColor: "#B1D3B1",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    action:{
        fontSize: 20,
        fontWeight: '600',
    },
    leave:{
        zIndex: 99,
        backgroundColor: "#FAC6C8",
        borderRadius: 15,
        marginTop: 25,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#F68F92",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    }

})


