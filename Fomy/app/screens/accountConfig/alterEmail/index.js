import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
import { app_auth, app_BKT, app_DB} from '../../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather'


export default function AlterEmail({ navigation }){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [novoEmail, setNovoEmail] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex', marginBottom: 54 }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.10)" }} >
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
    
        
        // Snapshot that verifies doc
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                // Var that will be used to receive the image link
                var image2 = ""
                
                snapshot.docs.forEach(doc =>{
                    // Gets the "Foto" field from the doc
                    image2 = doc.data().Foto
                })
                // image const now has the link


    
            }
        })
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
                    console.log('Hell yeah')
                    alert('E-mail alterado com sucesso!')
                  })
            
          }).catch((error) => {
            // An error ocurred
            // ...
            console.log('E-mail ou Senha errados')
            alert('E-mail ou Senha errado!!! >:(')
          });

    }
    
    return(

    <SafeAreaView style={styles.container} >



        <View style={styles.content} >

            <View style={styles.inputarea} >
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Insira seu e-mail atual"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                    secureTextEntry={true}
                ></TextInput>

                <TextInput
                    value={novoEmail}
                    style={styles.input}
                    placeholder="Insira seu e-mail novo"
                    autoCapitalize="none"
                    onChangeText={(text) => setNovoEmail(text)}
                    secureTextEntry={true}
                ></TextInput>

                <TextInput
                    value={senha}
                    style={styles.input}
                    placeholder="Insira sua senha atual"
                    autoCapitalize="none"
                    onChangeText={(text) => setSenha(text)}
                    secureTextEntry={true}
                ></TextInput>
            </View>


            <View style={styles.buttonarea} >    
                <TouchableOpacity style={styles.button} onPress={NewPassword} activeOpacity={0.9} >
                    <Text style={styles.action} >Confirmar E-mail</Text>
                </TouchableOpacity>
            </View>


        </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center'
    
    },
    inputarea:{
        marginStart: 6,
        marginEnd: 6,
    
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 5,
        borderBottomWidth: 10,
        borderRadius: 15,
        borderColor: "rgba(0,0,0,0.18)",
        width: "100%",
        alignSelf: "center",
        padding: 15,
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 40
    },
    content:{
        paddingLeft: 15,
        paddingRight: 15,
    },
    action:{
        fontSize: 20,
        fontWeight: '700'
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
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#91C0F3"
    }

})



