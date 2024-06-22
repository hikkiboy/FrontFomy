import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, Dimensions, BackHandler, Platform } from 'react-native';
import React, { useState, useEffect } from 'react'
import { app_auth } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import { AntDesign } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar'
import { LogBox } from 'react-native';


LogBox.ignoreAllLogs(); //Ignore all log notifications

const Login = ({navigation}) => {
  const height = Dimensions.get("window").height
  const [stuffHeight, setStuffHeight] = useState(85)
  const [imageHeight, setImageHeight] = useState(225.05)
  const [imageWidth, setImageWidth] = useState(207.2)
  const [fontSize, setFontSize] = useState(23)
  const [googleHeight, setGoogleHeight] = useState(32)
  const [googleWidth, setGoogleWidth] = useState(32)
  const [ tinyText, setTinyText ] = useState(23);

  if(Platform.OS === 'android'){
    NavigationBar.setBackgroundColorAsync('#FFF');
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
        //console.log("focado inicial")
        const backAction = () => {
            BackHandler.exitApp()
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
    
        return () => backHandler.remove();
    }

},[isFocused])
  
  useEffect(() => {
    if(height <= 700){
      //console.log("tela pequena")
      //console.log(height)
      setStuffHeight(75)
      setImageHeight(180.04)
      setImageWidth(165.76)
      setFontSize(18)
      setGoogleHeight(26)
      setGoogleWidth(26)
      setTinyText(21)
    }
  })

    return (
        <SafeAreaView style={styles.container} >
          { Platform.OS === 'ios' ? (
            <>
              <StatusBar style='auto'/>
            </>
          ):(
            <>
            </>
          )}

          <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />
    
          <TouchableOpacity style={[styles.buttonCadastro, { height: stuffHeight }]} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={[styles.login, {fontSize: fontSize}]}>Cadastro</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={[styles.buttonLogin, { height: stuffHeight }]} onPress={ () => navigation.navigate('Loginpage')}>
            <Text style={[styles.login, {fontSize: fontSize}]}>Login</Text>
          </TouchableOpacity>
    
          
          {/* <Image style={{width: "50%", height: "0.9%", resizeMode: "stretch", marginVertical: "10%"}} source={require("../../assets/lines-detail.png")} /> */}
          
          <View style={{flexDirection:"row", justifyContent: "center", alignItems: 'center'}}>
            <Octicons name="dash" size={80} color="#dbdbdb" />
            <Text style={[styles.otherOptions, { fontSize: tinyText }]}> ou </Text>
            <Octicons name="dash" size={80} color="#dbdbdb" />
          </View>

          <TouchableOpacity style={[styles.buttonCadastroGoogle, { height: (stuffHeight - 10) }]} onPress={ () => navigation.navigate('Loginpage')}>
            
            <Text style={[ styles.login ,{ fontSize: fontSize, color: "#303030" }]} >Entre com </Text>
            <Text style={{ color: "#4285f4", fontSize: fontSize,fontFamily: 'FredokaSemibold' }} >G</Text>
            <Text style={{ color: "#ea4335", fontSize: fontSize,fontFamily: 'FredokaSemibold' }} >o</Text>
            <Text style={{ color: "#fbbc05", fontSize: fontSize,fontFamily: 'FredokaSemibold' }} >o</Text>
            <Text style={{ color: "#4285f4", fontSize: fontSize,fontFamily: 'FredokaSemibold' }} >g</Text>
            <Text style={{ color: "#34a853", fontSize: fontSize,fontFamily: 'FredokaSemibold' }} >l</Text>
            <Text style={{ color: "#ea4335", fontSize: fontSize,fontFamily: 'FredokaSemibold' }} >e</Text>
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
    backgroundColor: '#70d872',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#62bc63',
    borderBottomWidth: 8,
    borderWidth: 5
  },
  buttonLogin: {
    backgroundColor: '#fab151',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#ed8a07',
    borderBottomWidth: 8,
    borderWidth: 5,
    marginTop: "5%"
    
  },
  login:{
    fontFamily: "FredokaSemibold",
    color: "#303030"
  },
  loginGoogle:{
    fontSize: 28,
    color: "#FFF"
  },
  buttonCadastroGoogle: {
    backgroundColor: '#FFF',
    width: "85%",
    borderRadius: 15,
    borderColor: '#dbdbdb',
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
    marginHorizontal: 10,
    marginBottom: 5,
    color: "#505050",
    fontFamily: "FredokaSemibold"
    
  },

  
  
});





