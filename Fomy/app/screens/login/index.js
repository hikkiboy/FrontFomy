import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, {useState} from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import Ionicons from '@expo/vector-icons/Ionicons'




const Login = ({navigation}) => {

    return (
        <SafeAreaView>
        <Logo/>
  
        <TouchableOpacity style={styles.bottonCadastro} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.loginCadastro}>Cadastro</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.bottonLogin} onPress={ () => promptAsync()}>
        <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
  
        <Text style={styles.otherOptions}>-- ou entre com --</Text>
        
        <View style={styles.loginsDiff}>
        <TouchableOpacity style={styles.bottonCadastroGoogle}
        onPress={() => promptAsync()}>
        <Image source={require('../../assets/logoGoogle.png')}  resizeMode='center' style={styles.loginGoogle}/>
        </TouchableOpacity>
  
        <TouchableOpacity>
        <Ionicons name='logo-facebook' size={70} color='blue' style={styles.loginFacebook} onPress={ () => {Alert.alert('Cadastro com Facebook feito com sucesso')}}/>
        </TouchableOpacity>
  
        </View>
  
        
      </SafeAreaView>
    )
}
export default Login





const styles = StyleSheet.create({
  bottonCadastro: {
    alignSelf: 'center',
    backgroundColor: '#7EB77F',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    paddingLeft: 42,
    paddingRight: 42,
    borderRadius: 20,
    borderColor: 'black',
    borderBottomWidth: 7,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderWidth: 3,
    margin: 3,
  },
  loginCadastro:{
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    paddingLeft: 40,
    paddingRight: 40,
  },
  bottonLogin: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: 'black',
    borderWidth: 3,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10
    
  },
  login:{
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    paddingLeft: 57,
    paddingRight: 57,
  },
  loginGoogle:{
    alignSelf: 'center',
    width: 60,
    height: 60,
    padding: 10,
    paddingLeft: 1,
    paddingRight: 1,
    marginTop: 15,
    marginLeft: 20
  },
  bottonCadastroGoogle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 42,
    paddingRight: 42,
    marginBottom: 15
  },
  loginsDiff:{
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 30
  },
  loginFacebook:{
    textAlign:'center',
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 20
  },
  otherOptions:{
    top: 30,
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.3,
    width:'100%',
    marginBottom: 50
    },
  
});





