import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ActivityIndicator,Button, KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createUserWithEmailAndPassword } from 'firebase/auth';


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
        <TextInput value={email} style = {styles.input} placeholder='Email' autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}></TextInput>
         <TextInput value={senha} style = {styles.input} placeholder='Senha' autoCapitalize='none'
        onChangeText={(text) => setSenha(text)} secureTextEntry={true}></TextInput>

        {loading ?(
           <ActivityIndicator size="large" color="#0000ff"/>  
        ): (
          <>
          <Button title='Entrar' onPress = {SignIn}/>
          <Button title = 'Registrar' onPress={SignUp}/>

          </>
        )} 
       
      </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
    )
}
export default Cadastro





const styles = StyleSheet.create({
 input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFF'
 },
 container:{
  marginHorizontal: 20,
  flex: 1,
  justifyContent:'center'
 }
});