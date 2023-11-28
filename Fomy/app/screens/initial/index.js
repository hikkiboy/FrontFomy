import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, {useState} from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import {AntDesign} from '@expo/vector-icons'; 




const Login = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container} >

          <Image style={styles.logo} source={require("../../assets/logo-full.png")} />
    
          <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.loginCadastro}>Cadastro</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.buttonLogin} onPress={ () => navigation.navigate('Loginpage')}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
    
          <Text style={styles.otherOptions}>-- ou entre com --</Text>

            <TouchableOpacity style={styles.buttonCadastroGoogle} onPress={ () => navigation.navigate('Loginpage')}>
              <AntDesign style={styles.iconeGoogle} name="google" size={28} />
              <Text style={[styles.loginGoogle]}>oogle</Text>
            
            </TouchableOpacity>
  
        
      </SafeAreaView>
    )
}
export default Login





const styles = StyleSheet.create({
  container:{
    flex: 1,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFF"

  },
  logo:{
    width: 207.2,
    height: 225.05,
    marginBottom: 45,
    resizeMode: 'stretch'
  },
  buttonCadastro: {
    backgroundColor: '#A4CCA4',
    padding: 12,
    width: "85%",
    borderRadius: 15,
    borderColor: '#8eb28e',
    borderBottomWidth: 8,
    borderWidth: 5
  },
  loginCadastro:{
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    opacity: 0.5,
  },
  buttonLogin: {
    backgroundColor: '#FFF',
    padding: 12,
    width: "85%",
    borderRadius: 15,
    borderColor: '#dbdbdb',
    borderBottomWidth: 8,
    borderWidth: 5,
    marginTop: 20
    
  },
  login:{
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 12,
    paddingLeft: 57,
    paddingRight: 57,
    opacity: 0.5,
  },
  loginGoogle:{
    fontSize: 28,
    fontWeight: 'bold',
    color: "#FFF"
  },
  buttonCadastroGoogle: {
    backgroundColor: '#F68F92',
    padding: 10,
    width: "85%",
    borderRadius: 15,
    borderColor: '#e88689',
    borderBottomWidth: 8,
    borderWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginsDiff:{
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  otherOptions:{
    top: 30,
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.3,
    width:'100%',
    marginBottom: 50
    },
    iconeGoogle:{
      color: "#FFF"
    }
  
});





