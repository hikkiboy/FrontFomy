import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { app_auth, app_BKT, app_DB} from '../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'


export default function DeleteAccount({ navigation }){
    const [senha, setSenha] = useState('')
    const [image, setImage] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex', marginBottom: 54 }} >
                <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.10)" }} >
                    <View style={{width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ width: "8.5%", marginStart: 10 }} onPress={() => navigation.goBack()} ><Feather name="chevron-left" size={28} /></TouchableOpacity>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                            <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center', position: 'absolute' }} >Deletar Conta</Text>
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
            console.log('Não foi dessa vez :(')
          });

    }
    
    return(

    <SafeAreaView style={styles.container}>



        <View style={styles.content} >
       
            <View style={styles.inputarea} >
                <TextInput
                    value={senha}
                    style={styles.input}
                    placeholder="Insira sua senha"
                    autoCapitalize="none"
                    onChangeText={(text) => setSenha(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.deletearea} >
                <TouchableOpacity style={styles.delete} onPress={DeleteAll} activeOpacity={0.9} >
                    <Text style={styles.action} >Confirmar</Text>
                </TouchableOpacity>
            </View>


            </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent: 'center',

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
    marginBottom: 50
  },
content:{
    paddingLeft: 15,
    paddingRight: 15,
},
action:{
    fontSize: 20,
    fontWeight: '700'
},
deletearea:{
    marginTop: 20,
    marginStart: 6,
    marginEnd: 6,
},
delete:{
    zIndex: 99,
    backgroundColor: "#FAC6C8",
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#F68F92",
    width: "100%"
}

})



