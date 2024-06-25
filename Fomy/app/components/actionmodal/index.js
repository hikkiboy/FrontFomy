import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, useState, TextInput } from "react-native"
import { app_auth } from '../../../firebaseConfig'
import { Feather, FontAwesome6, FontAwesome5 } from 'react-native-vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { pickImage } from "../../utils/imageUpload"



export function ActionModal({ handleActionOff, handleAction, navigation, handleName, userImage, input, changeInput, name, nameChange, update, premium }) {

    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={{ backgroundColor: "rgba(0,0,0,0.08)", justifyContent: 'flex-end', borderRadius: 10 }} >
                <View style={styles.content} >
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => pickImage(userImage)} >
                        <Text allowFontScaling={false} style={styles.action} >Alterar Foto</Text>
                        <FontAwesome6 color="#303030" name="camera" size={26} />
                    </TouchableOpacity>

                    {!input ? (
                        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleName} >
                            <Text allowFontScaling={false} style={styles.action} >Alterar Nome</Text>
                            <FontAwesome6 color="#303030" name="feather" size={26} />
                        </TouchableOpacity>
                    ) : (
                        <View>
                            <View style={styles.button} >
                                <TextInput allowFontScaling={false} enterKeyHint={"done"} value={name} onChangeText={(text) => nameChange(text)} autoFocus={true} maxLength={30} placeholder="Novo nome" style={[styles.action, { flex: 1 }]} />
                                <TouchableOpacity style={{ marginHorizontal: 20 }} activeOpacity={0.8} onPress={() => { changeInput(false); update(true) }} >
                                    <FontAwesome6 name="check" size={26} color="#303030" />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => update(false)} >
                                    <FontAwesome6 name="xmark" size={26} color="#303030" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => { handleAction(); navigation.navigate('Configs', { premium: [premium] }) }}>
                        <Text allowFontScaling={false} style={styles.action} >Configurações</Text>
                        <FontAwesome6 color="#303030" name="gear" size={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.leave} activeOpacity={0.8} onPress={() => { handleActionOff() }} >
                        <Text allowFontScaling={false} style={[styles.action, { color: "#E15F64" }]} >Sair</Text>
                        <FontAwesome6 color="#E15F64" name="right-from-bracket" size={26} />
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    content: {
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 35,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 6,
    },
    button: {
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
    action: {
        fontSize: 21,
        fontFamily: "FredokaSemibold",
        color: "#303030"
    },
    leave: {
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


