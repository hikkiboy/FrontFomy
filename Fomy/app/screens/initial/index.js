import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import { AntDesign } from '@expo/vector-icons'; 




const Login = ({navigation}) => {
  const height = Dimensions.get("window").height
  const [stuffHeight, setStuffHeight] = useState(90)
  const [imageHeight, setImageHeight] = useState(225.05)
  const [imageWidth, setImageWidth] = useState(207.2)
  const [fontSize, setFontSize] = useState(22)
  const [googleHeight, setGoogleHeight] = useState(32.64)
  const [googleWidth, setGoogleWidth] = useState(99.14)
  
  useEffect(() => {
    if(height <= 680){
      console.log("tela pequena")
      setStuffHeight(75)
      setImageHeight(180.04)
      setImageWidth(165.76)
      setFontSize(18)
      setGoogleHeight(26.112)
      setGoogleWidth(79.312)
    }
  })

    return (
        <SafeAreaView style={styles.container} >

          <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />
    
          <TouchableOpacity style={[styles.buttonCadastro, { height: stuffHeight }]} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={[styles.login, {fontSize: fontSize}]}>Cadastro</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={[styles.buttonLogin, { height: stuffHeight }]} onPress={ () => navigation.navigate('Loginpage')}>
            <Text style={[styles.login, {fontSize: fontSize}]}>Login</Text>
          </TouchableOpacity>
    
          <Text style={[styles.otherOptions, { fontSize: (fontSize - 1) }]}>-- ou entre com --</Text>

          <TouchableOpacity style={styles.buttonCadastroGoogle} onPress={ () => navigation.navigate('Loginpage')}>
            <Image tintColor={"#FFF"} style={[{ width: googleWidth, height: googleHeight }]} source={require("../../assets/fullLogoGoogle.png")} />
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
    marginBottom: "10%",
    resizeMode: 'stretch'
  },
  buttonCadastro: {
    backgroundColor: '#A4CCA4',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#8eb28e',
    borderBottomWidth: 8,
    borderWidth: 5
  },
  buttonLogin: {
    backgroundColor: '#FFF',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#dbdbdb',
    borderBottomWidth: 8,
    borderWidth: 5,
    marginTop: "5%"
    
  },
  login:{
    fontWeight: 'bold',
    opacity: 0.5,
  },
  loginGoogle:{
    fontSize: 28,
    color: "#FFF"
  },
  buttonCadastroGoogle: {
    backgroundColor: '#F68F92',
    padding: 11,
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
    textAlign: 'center',
    opacity: 0.3,
    width:'100%',
    marginVertical: "7%"
    },
  
});





