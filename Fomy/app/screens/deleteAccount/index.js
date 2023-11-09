import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { app_auth, app_BKT, app_DB} from '../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


export default function DeleteAccount({ navigation }){
    const [senha, setSenha] = useState('')
    const [image, setImage] = useState('')

    useEffect(()=>{

        
    
        const dunnoRef = collection(app_DB, 'Usuarios')
    
        const q = query(
            dunnoRef,
            where(documentId(), '==', app_auth.currentUser.uid)
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const image2 = []
                
                snapshot.docs.forEach(doc =>{   
                    image2.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setImage(image2)


    
            }
        })
        console.log(image)
        return() => subscriver()
    
    },[])

    async function DeleteAll({}) {

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
                    /*if(image.Foto != "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Default-Profile-Picture-PNG-Photo-3895174684.png?alt=media&token=f70e36af-2857-405f-b307-5e7abe35f347"){
                        deleteObject(ref(app_BKT, image.Foto)).then(() => {navigation.navigate("Login")})
                    } else { navigation.navigate("Login") }*/
                    navigation.navigate("Login")
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



