import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { app_auth, app_BKT, app_DB} from '../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'
import {FontAwesome, FontAwesome6} from 'react-native-vector-icons'


export default function DeleteAccount({ navigation }){
    const [senha, setSenha] = useState('')
    const [image, setImage] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex' }} >
                <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 10 }} >
                    <View style={{width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center', borderRadius: 10 }} >
                        <TouchableOpacity activeOpacity={0.8} style={{ width: "8.5%", marginStart: 20 }} onPress={() => navigation.goBack()} ><FontAwesome size={25} color={"#303030"} name='arrow-left' /></TouchableOpacity>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                            <Text allowFontScaling={false} style={{ fontSize: 25, fontFamily: "FredokaSemibold", alignSelf: 'center', position: 'absolute', color: "#303030" }} >Deletar Conta</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            )
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
                setImage(image2)


    
            }
        })
        return() => subscriver()
    
    },[])

    async function DeleteAll({}) {

        // Reference to the user's doc
        const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
        const auth = getAuth()
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            senha
        )
        const result = await reauthenticateWithCredential(
            auth.currentUser, 
            credential
        ).then((sucessuful) => {
            // User re-authenticated.
            deleteUser(auth.currentUser).then(() => {
                // User deleted.
                deleteDoc(userRef).then(() => {
                    //Image deleted, if it's not the default
                    if(image != "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Default-Profile-Picture-PNG-Photo-3895174684.png?alt=media&token=f70e36af-2857-405f-b307-5e7abe35f347"){
                        deleteObject(ref(app_BKT, image)).then(() => {navigation.navigate("Login")})
                    } else { navigation.navigate("Login") }
                })
            })
            
          }).catch((error) => {
            // An error ocurred
            // ...
            //console.log('Não foi dessa vez :(')
          });

    }
    
    return(

    <KeyboardAwareScrollView contentContainerStyle={styles.container}>

        <Image style={styles.depressoberto} source={require('../../assets/adepressoberto.png')}/>
        <Text allowFontScaling={false} style={styles.depressoDialogue}>Vamos sentir sua falta...</Text>
        <View style={styles.content} >
       
            <View style={styles.inputarea} >
                <View style={styles.inputextarea}>
                    <TextInput allowFontScaling={false}
                        value={senha}
                        style={styles.input}
                        placeholder="Insira sua senha"
                        autoCapitalize="none"
                        onChangeText={(text) => setSenha(text)}
                        secureTextEntry={true}
                    />
                    <FontAwesome6 color={"#303030"} name="lock" size={27} />
                </View>
            </View>
            <View style={styles.deletearea} >
                <TouchableOpacity style={styles.delete} onPress={DeleteAll} activeOpacity={0.8} >
                    <Text allowFontScaling={false} style={styles.action} >Confirmar</Text>
                    <FontAwesome6 color={"#FFF"} name="eraser" size={25} />
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
depressoberto:{
    width: '60%',
    height: '40%',
    marginLeft: '25%',
    resizeMode: 'contain',
},
depressoDialogue:{
    fontSize: 25,
    fontFamily: "FredokaSemibold",
    paddingTop: 10,
    paddingBottom: 50,
    textAlign: 'center',
    color: "#303030",
    
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
},
action:{
    fontSize: 22,
    fontFamily: "FredokaSemibold",
    color: "#FFF"
},
deletearea:{
    marginTop: 20,
    marginStart: 6,
    marginEnd: 6,
},
delete:{
    zIndex: 99,
    backgroundColor: "#FA787D",
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#E15F64",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25
}

})



