import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {Button} from 'react-native'



const LoginPage = () => {
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
  
    return (
      <SafeAreaView>
      <Logo/>
      <KeyboardAvoidingView behavior='padding'>
      <View>
        <TextInput value={email} style = {styles.input} placeholder='Email' autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}></TextInput>
         <TextInput value={senha} style = {styles.input} placeholder='Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>

        {loading ?(
           <ActivityIndicator size="large" color="#0000ff"/>  
        ): (
          <>
          <TouchableOpacity title='Entrar' style={styles.buttonLogin} onPress={SignIn}>
          <Text style={styles.text}>Entrar</Text>
          </TouchableOpacity>
          </>
        )} 
       
      </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
    )
}
export default LoginPage

const styles = StyleSheet.create({
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
 buttonLogin:{
  backgroundColor: '#7EB77F',
  alignSelf: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  padding: 13,
  paddingLeft: 40,
  paddingRight: 40,
  borderBottomStartRadius: 0,
  borderBottomEndRadius: 0,
  borderColor: 'black',
  borderWidth: 3,
  marginTop: 20,
  marginBottom: 5,
  borderRadius: 10,
  width: 250
 },
 text:{
  fontWeight: 'bold',
  fontSize: 18,
  textAlign: 'center'
 }

 
});