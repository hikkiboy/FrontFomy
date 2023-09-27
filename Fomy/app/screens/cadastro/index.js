import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {Button} from 'react-native-elements'



const Cadastro = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = app_auth;

    const SignIn = async () => {
      setLoading(true)
      try{
        const response = await signInWithEmailAndPassword(auth, email, senha)
        console.log(response)
      } catch (error) {
        console.log(error)
        alert('deu erro dog')
      } finally{
        setLoading(false)
      }
    }

      const SignUp = async () => {
        setLoading(true)
        try{
          const response = await createUserWithEmailAndPassword(auth, email, senha)
          console.log(response)
          alert('Olha o email')
  
        } catch (error) {
          console.log(error)
          alert('Faio, Erro : ' + error)
        } finally{
          setLoading(false)
        }
    }
  
    return (
      <SafeAreaView>
      <Logo/>
      <KeyboardAvoidingView behavior='padding'>
      <View>
        <TouchableOpacity style = {styles.topoPao}>
        </TouchableOpacity>
        <TextInput value={email} style = {styles.inputEmail} placeholder='Email' autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}></TextInput>
         <TextInput value={senha} style = {styles.inputConfirmarSenha} placeholder='Confirmar Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>
         <TextInput value={senha} style = {styles.inputSenha} placeholder='Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>

        {loading ?(
           <ActivityIndicator size="large" color="#0000ff"/>  
        ): (
          <>
          <TouchableOpacity style = {styles.buttonRegistro} title = 'Registrar' onPress={SignUp}>
          <Text style={styles.text}>Registrar</Text>
          </TouchableOpacity>

          </>
        )} 
       
      </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
    )
}
export default Cadastro

const styles = StyleSheet.create({
  topoPao:{
    backgroundColor:'#c58749',
  alignSelf: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  padding: 25,
  paddingLeft: 42,
  paddingRight: 42,
  borderRadius: 20,
  borderBottomWidth: 5,
  borderWidth: 3,
  marginBottom:5,
  marginTop: -20,
  width: 250,
  borderBottomStartRadius: 0,
  borderBottomEndRadius: 0,
  },
 inputSenha: {
  backgroundColor: '#974E46',
  marginTop: 0,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold'
 },
 inputConfirmarSenha: {
  backgroundColor: '#ff6347',
  marginTop: 0,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold'
 },
 inputEmail: {
  backgroundColor: '#7EB77F',
  marginTop: 0,
    margin: 10,
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold'
 },
 input: {
  marginTop: 0,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
    padding: 15
 },
 buttonRegistro:{
  backgroundColor:'#c58749',
  alignSelf: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  padding: 13,
  paddingLeft: 42,
  paddingRight: 42,
  borderRadius: 20,
  borderColor: 'black',
  borderBottomWidth: 7,
  borderWidth: 3,
  margin: 3,
  width: 250,
  borderTopStartRadius: 0,
  borderTopEndRadius: 0,
 },
 text:{
  fontWeight: 'bold',
  fontSize: 18,
  textAlign: 'center'
 }

 
});