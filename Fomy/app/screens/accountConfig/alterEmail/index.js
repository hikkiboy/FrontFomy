import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
import { app_auth, app_BKT, app_DB} from '../../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail, send } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function AlterEmail({ navigation }){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [novoEmail, setNovoEmail] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex' }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.18)" }} >
                        <View style={{width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity style={{ width: "8.5%", marginStart: 10 }} onPress={() => navigation.goBack()} ><Feather name="chevron-left" size={28} /></TouchableOpacity>
                            <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                                <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center', position: 'absolute' }} >Alterar E-mail</Text>
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
        
        return() => subscriver()
    
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

    <SafeAreaView style={styles.container} >



        <View style={styles.content} >

            <View style={styles.inputarea} >
                <View style={styles.inputextarea}>
                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Insira seu e-mail atual"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        secureTextEntry={true}
                    ></TextInput>
                    <Feather name="mail" size={27} />
                </View>
                <View style={styles.inputextarea}>
                    <TextInput
                        value={novoEmail}
                        style={styles.input}
                        placeholder="Insira seu e-mail novo"
                        autoCapitalize="none"
                        onChangeText={(text) => setNovoEmail(text)}
                        secureTextEntry={true}
                    ></TextInput>
                    <Feather name="mail" size={27} />
                </View>
                <View style={styles.inputextarea}>
                    <TextInput
                        value={senha}
                        style={styles.input}
                        placeholder="Insira sua senha atual"
                        autoCapitalize="none"
                        onChangeText={(text) => setSenha(text)}
                        secureTextEntry={true}
                    ></TextInput>
                    <Feather name="lock" size={27} />
                </View>
            </View>


            <View style={styles.buttonarea} >    
                <TouchableOpacity style={styles.button} onPress={NewPassword} activeOpacity={0.9} >
                    <Text style={styles.action} >Confirmar E-mail</Text>
                    <FontAwesome name="check" size={25} />
                </TouchableOpacity>
            </View>


        </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
        fontSize: 18,
        fontWeight: '500',
        width: '80%'
    },
    content:{
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 65
    },
    action:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonarea:{
        marginTop: 20,
        marginStart: 6,
        marginEnd: 6,
    },
    button:{
        zIndex: 99,
        backgroundColor: "#C8E0F9",
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#91C0F3",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    }

})



