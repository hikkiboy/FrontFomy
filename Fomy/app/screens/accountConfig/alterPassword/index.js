import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
import { app_auth, app_BKT, app_DB} from '../../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";


export default function AlterPassword({ navigation }){
    const [senha, setSenha] = useState('')
    const [novaSenha, setNovaSenha] = useState('')

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
            auth.currentUser.email,
            senha
        )
        const result = await reauthenticateWithCredential(
            auth.currentUser, 
            credential
        ).then((sucessuful) => {
            // User re-authenticated.
                updatePassword(auth.currentUser, novaSenha).then(() => {
                    // Changes password to the one typed.
                    console.log('hell yeah')
                    alert('Senha alterada com sucesso!')
                  })
            
          }).catch((error) => {
            // An error ocurred
            // ...
            console.log('Senha Errada')
            alert('Senha errada!!! >:(')
          });

    }
    
    return(

    <SafeAreaView>



        <View style={styles.content} >
       
        <TextInput
            value={senha}
            style={styles.input}
            placeholder="Insira sua Senha atual"
            autoCapitalize="none"
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
          ></TextInput>

        <TextInput
            value={novaSenha}
            style={styles.input}
            placeholder="Insira sua nova Senha"
            autoCapitalize="none"
            onChangeText={(text) => setNovaSenha(text)}
            secureTextEntry={true}
          ></TextInput>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate("Configs")} activeOpacity={0.9} >
                <Text style={styles.action} >Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.leave} onPress={NewPassword} activeOpacity={0.9} >
                <Text style={styles.action} >Confirmar Senha</Text>
            </TouchableOpacity>


            </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1

},
input: {
    marginTop: 20,
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



