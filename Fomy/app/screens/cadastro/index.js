import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements'
import { doc, setDoc } from "firebase/firestore"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'






const Cadastro = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = app_auth;

    const height = useHeaderHeight()
    const SignIn = async () => {
      setLoading(true)
      try{
        const response = await signInWithEmailAndPassword(auth, email, senha)
        

      } catch (error) {
        console.log(error)
        alert('deu erro')
      } finally{
        setLoading(false)
      }
    }

      const SignUp = async () => {
        setLoading(true)
        try{
          
          const response = await createUserWithEmailAndPassword(auth, email, senha)
 
          const Other = setNome(nome)
          const docRef = await setDoc(doc(app_DB, "Usuarios", response.user.uid), {
            Alergias:[],
            Exp : 0,
            Foto : "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Default-Profile-Picture-PNG-Photo-3895174684.png?alt=media&token=f70e36af-2857-405f-b307-5e7abe35f347",
            Itens: [],
            Moedas: 0,
            Nivel: 1,
            Nome : nome,
            Premium: false,
            ProgressoTrilhas: [],
            ReceitasFeitas: [],
            Insignias: ["Beta"],
            Titulo: "Iniciante"

          })

          
   
          alert('Usuário Criado com sucesso !')
  
        } catch (error) {
          console.log(error)
          alert('Faio, Erro : ' + error)
        } finally{
          setLoading(false)
        }
    }
  
   return (
        <KeyboardAwareScrollView style = {styles.fundo}>
        
        <View style={styles.container}>

        <TextInput value= {nome} style={styles.input} placeholder=' Nome' autoCapitalize='none' onChangeText={(text) => setNome(text)}></TextInput>
        <TextInput value={email} style = {styles.input} placeholder=' Email' autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}></TextInput>
         <TextInput value={senha} style = {styles.input} placeholder=' Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>
        <TextInput value={senha} style = {styles.input} placeholder=' Confirmar Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>

          {loading ? (
            <ActivityIndicator size="30" color="#7EB77F" />
          ) : (
            <>
          <TouchableOpacity style = {styles.buttonLogin} title = 'Registrar' onPress={SignUp}>
          <Text style={styles.text}>Começar jornada!</Text>
          </TouchableOpacity>
            </>
          )}
          </View>
        </KeyboardAwareScrollView>

  );
};
export default Cadastro;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: '60%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  fundo:{
    backgroundColor: "#FFF"
  },
  input: {
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderRadius: 15,
    borderColor: '#dbdbdb',
    borderBottomWidth: 7,
    borderWidth: 4,
    width: 300,
    alignSelf: "center",
    padding: 15,
    marginBottom: 15
  },
  buttonRegistro: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 13,
    paddingLeft: 42,
    paddingRight: 42,
    borderRadius: 20,
    borderColor: "black",
    borderBottomWidth: 7,
    borderWidth: 3,
    margin: 3,
    width: 250,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  buttonLogin: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    
    paddingLeft: 40,
    paddingRight: 40,
    //borderBottomStartRadius: 0,
    //borderBottomEndRadius: 0,
    
    backgroundColor: '#A4CCA4',
    padding: 12,
    width: "85%",
    borderRadius: 15,
    borderColor: '#8eb28e',
    borderBottomWidth: 8,
    borderWidth: 5,
    marginTop: 20,
    marginBottom: 5,
    height: 60,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    opacity: 0.5,
  },
  forgotPassword:{
    alignSelf: "center",
    opacity: 0.4
  }
});