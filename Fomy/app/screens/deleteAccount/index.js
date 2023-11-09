import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { app_auth, app_BKT, app_DB} from '../../../firebaseConfig'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { useState } from "react";


export default function DeleteAccount({navigation}){
    const [senha, setSenha] = useState('')
    async function DeleteAll({}) {

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
            /*deleteUser(auth.currentUser).then(() => {
                // User deleted.
              }) */
            console.log('Thy end is now!')
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



