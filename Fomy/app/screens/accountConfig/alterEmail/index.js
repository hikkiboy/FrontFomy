import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
import { app_auth, app_BKT, app_DB} from '../../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail, send } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Feather from 'react-native-vector-icons/Feather'
import {FontAwesome, FontAwesome6} from 'react-native-vector-icons'


export default function AlterEmail({ navigation }){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [novoEmail, setNovoEmail] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex', backgroundColor: '#FFF' }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 10 }} >
                        <View style={{width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center', borderRadius: 10 }} >
                            <TouchableOpacity activeOpacity={0.8} style={{ width: "8.5%", marginStart: 20 }} onPress={() => navigation.goBack()} ><FontAwesome size={25} color={"#303030"} name='arrow-left' /></TouchableOpacity>
                            <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                                <Text  allowFontScaling={false} style={{ fontSize: 25, fontFamily: "FredokaSemibold", alignSelf: 'center', position: 'absolute', color: "#303030" }} >Alterar E-mail</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            )
            /*title: "",
            headerRight: () => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', width: "92%", alignSelf: 'center', textAlign: 'center', color: "black", zIndex: 1}} >Configurações</Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ zIndex: 99, backgroundColor: 'blue' }} onPress={() => {navigation.goBack()}} ><Feather name="chevron-left" size={32} color={"black"} /></TouchableOpacity>
            )*/
        })
    }, [navigation])

    useEffect(()=>{

        
        // Reference to the doc for the query
        const dunnoRef = collection(app_DB, 'Usuarios')

        // Query for the user's doc
        const q = query(
            dunnoRef,
            where(documentId(), '==', app_auth.currentUser.uid)
        )
    
    },[])

    async function NewPassword({}) {

        // Reference to the user's doc
        const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
        const auth = getAuth()
        const credential = EmailAuthProvider.credential(
            email,
            senha
        )
        const result = await reauthenticateWithCredential(
            auth.currentUser, 
            credential
        ).then((sucessuful) => {
            // User re-authenticated.
                updateEmail(auth.currentUser, novoEmail).then(() => {
                    // Email updated!
                    // ...
                    //console.log('Hell yeah')
                    alert('E-mail alterado com sucesso!')
                  })
            
          }).catch((error) => {
            // An error ocurred
            // ...
            //console.log('E-mail ou Senha errados')
            alert('E-mail ou Senha errado!!! >:(')
          });

    }
    
    return(

    <KeyboardAwareScrollView contentContainerStyle={styles.container} >



        <View style={styles.content} >

            <View style={styles.inputarea} >
                <View style={styles.inputextarea}>
                    <TextInput allowFontScaling={false}
                        value={email}
                        style={styles.input}
                        placeholder="Insira seu e-mail atual"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    ></TextInput>
                    <FontAwesome6 color={"#303030"} name="at" size={25} />
                </View>
                <View style={styles.inputextarea}>
                    <TextInput allowFontScaling={false}
                        value={novoEmail}
                        style={styles.input}
                        placeholder="Insira seu e-mail novo"
                        autoCapitalize="none"
                        onChangeText={(text) => setNovoEmail(text)}
                    ></TextInput>
                    <FontAwesome6 color={"#303030"} name="at" size={25} />
                </View>
                <View style={styles.inputextarea}>
                    <TextInput allowFontScaling={false}
                        value={senha}
                        style={styles.input}
                        placeholder="Insira sua senha atual"
                        autoCapitalize="none"
                        onChangeText={(text) => setSenha(text)}
                        secureTextEntry={true}
                    ></TextInput>
                    <FontAwesome6 color={"#303030"} name="lock" size={25} />
                </View>
            </View>


            <View style={styles.buttonarea} >    
                <TouchableOpacity style={styles.button} onPress={NewPassword} activeOpacity={0.8} >
                    <Text allowFontScaling={false} style={styles.action} >Confirmar E-mail</Text>
                    <FontAwesome color="#FFF" name="check" size={25} />
                </TouchableOpacity>
            </View>


        </View>

    </KeyboardAwareScrollView>
)}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        minHeight: '100%',
        justifyContent: 'center',
        backgroundColor: "#FFF"
    
    },
    inputarea:{
        marginStart: 6,
        marginEnd: 6,
    
    },
    inputextarea:{
        backgroundColor: "#FFFFFF",
        borderWidth: 5,
        borderBottomWidth: 10,
        borderRadius: 15,
        borderColor: "rgba(0,0,0,0.18)",
        width: "100%",
        marginBottom: 50,
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    input: {
        fontSize: 20,
        fontFamily: "FredokaMedium",
        width: '80%'
    },
    content:{
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 65
    },
    action:{
        fontSize: 22,
        fontFamily: "FredokaSemibold",
        color: "#FFF"
    },
    buttonarea:{
        marginTop: 20,
        marginStart: 6,
        marginEnd: 6,
    },
    button:{
        zIndex: 99,
        backgroundColor: "#3B98EF",
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#2985DB",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    }

})



