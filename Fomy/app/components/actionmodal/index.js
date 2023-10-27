import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"
import { app_auth } from '../../../firebaseConfig'

export function ActionModal({ handleAction, navigation, handleName }){
    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={styles.contentbg} >
                <View style={styles.content} >
                    <TouchableOpacity style={styles.button} activeOpacity={0.9} >
                        <Text style={styles.action} >Mudar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleName} >
                        <Text style={styles.action} >Mudar Nome</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} >
                        <Text style={styles.action} >Configurações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.leave} activeOpacity={0.9} onPress={() => {app_auth.signOut(); navigation.navigate('Login')}} >
                        <Text style={styles.action} >Sair</Text>
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
        borderTopRightRadius: 15
    },
    contentbg:{
        backgroundColor: "#427643",
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        paddingTop: 7
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
    leave:{
        zIndex: 99,
        backgroundColor: "#DC6A87",
        borderRadius: 15,
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderBottomWidth: 6,
        borderColor: "#95233F"
    }

})