import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import {Button} from 'react-native'
import fundo from '../../assets/fundinho.png'
import { StatusBar } from 'expo-status-bar';






const Cadastro = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = app_auth;


    const SignIn = async () => {
      setLoading(true)
      try{
        const response = await signInWithEmailAndPassword(auth, email, senha)
        

      } catch (error) {

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


      <KeyboardAvoidingView style = {styles.container} behavior='padding'>
        
        <SafeAreaView >
        
        <TextInput value= {nome} style={styles.input} placeholder='Nome' autoCapitalize='none' onChangeText={(text) => setNome(text)}></TextInput>
        <TextInput value={email} style = {styles.input} placeholder='Email' autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}></TextInput>
         <TextInput value={senha} style = {styles.input} placeholder='Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>
        <TextInput value={senha} style = {styles.input} placeholder='Confirmar Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>
        

        {loading ?(
           <ActivityIndicator size="large" color="#0000ff"/>  
        ): (
          <>
          <TouchableOpacity style = {styles.buttonRegistro} title = 'Registrar' onPress={SignUp}>
          <Text style={styles.text}>Começar jornada!</Text>
          </TouchableOpacity>

          </>
        )} 
        </SafeAreaView>
      </KeyboardAvoidingView>

     
    
      

      
     

    )
}
export default Cadastro

const styles = StyleSheet.create({
  container:{
   flex:1,

  },
  input: {
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    alignSelf: "center",
    padding: 15,
  },
 buttonRegistro:{
  backgroundColor: "#7EB77F",
  alignSelf: "center",
  fontSize: 20,
  fontWeight: "bold",
  padding: 13,
  paddingLeft: 40,
  paddingRight: 40,
  borderColor: "black",
  borderWidth: 2,
  marginTop: 20,
  borderRadius: 10,
 },
 text:{
  fontWeight: 'bold',
  fontSize: 18,
  textAlign: 'center'
 },
 fundo:{
  backgroundColor: 'White'
 }

 
});