import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
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
            title: "",
            headerRight: () => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', width: "92%", alignSelf: 'center', textAlign: 'center', color: "black", zIndex: 1}} >Deletar Conta</Text>
            ),
            headerLeft: () => (
                <Pressable style={{ zIndex: 99 }} onPress={() => {navigation.goBack()}} ><Feather name="chevron-left" size={32} color={"black"} /></Pressable>
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

    <SafeAreaView>



        <View style={styles.content} >
       
        <TextInput
            value={senha}
            style={styles.input}
            placeholder="Insira sua Senha"
            autoCapitalize="none"
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
          ></TextInput>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate("Configs")} activeOpacity={0.9} >
                <Text style={styles.action} >Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.leave} onPress={DeleteAll} activeOpacity={0.9} >
                <Text style={styles.action} >Confirmar Deleção</Text>
            </TouchableOpacity>


            </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1

},
input: {
    marginTop: 200,
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignSelf: "center",
    padding: 15,
  },
content:{
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
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
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#7EB77F"
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
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#95233F"
}

})



