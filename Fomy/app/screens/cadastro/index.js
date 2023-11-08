import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React, {useState} from 'react'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import {Button} from 'react-native'
import fundo from '../../assets/fundinho.png'






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
        console.log(error)
        alert('algum erro ocorreu')
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
      
      <SafeAreaView>
      {/*<ImageBackground 
       source={fundo}
       style={styles.fundo}
    >*/}

      <View style = {styles.container}>
        
      
    

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

        

      </View>
      {/*</ImageBackground>*/}
     
    
      

      
     
    </SafeAreaView  >
    )
}
export default Cadastro

const styles = StyleSheet.create({
  container:{
    marginTop: 250,
    //marginBottom: 250,
  
  },
 input: {
  backgroundColor: '#FFFFFF',

    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor:'#A6A6A6',
    width: 300,
    alignSelf: 'center',
    padding: 15
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
  borderWidth: 3,
  marginTop: 20,
  marginBottom: 5,
  borderRadius: 15,
  width: 250,
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