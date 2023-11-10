import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"
import { app_auth } from '../../../firebaseConfig'
import Feather from 'react-native-vector-icons/Feather'

export function ActionModal({ handleAction, navigation, handleName, pickIt }){
    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={styles.content} >
                <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={pickIt} >
                    <Text style={styles.action} >Alterar Foto</Text>
                    <Feather name="camera" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleName} >
                    <Text style={styles.action} >Alterar Nome</Text>
                    <Feather name="edit" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('Configs')}>
                    <Text style={styles.action} >Configurações</Text>
                    <Feather name="settings" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.leave} activeOpacity={0.9} onPress={() => {app_auth.signOut(); navigation.navigate('Login')}} >
                    <Text style={styles.action} >Sair</Text>
                    <Feather name="log-out" size={26} />
                </TouchableOpacity>

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
        elevation: 10,
        shadowColor: "#000",
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