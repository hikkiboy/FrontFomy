import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { app_auth } from "../../../firebaseConfig";
import { Logo } from "../../components/logo";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

import { Feather } from 'react-native-vector-icons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();

  const height = Dimensions.get("window").height
  const [stuffHeight, setStuffHeight] = useState(70)
  const [imageHeight, setImageHeight] = useState(180.04)
  const [imageWidth, setImageWidth] = useState(165.76)
  const [fontSize, setFontSize] = useState(20)
  const [ tinyText, setTinyText ] = useState(16)

  const [email, setEmail] = useState("coralinegaming93@gmail.com");
  const [senha, setSenha] = useState("1234567");
  
  const [loading, setLoading] = useState(false);
  const auth = app_auth;

  useEffect(() => {
    if(height <= 700){
      console.log("tela pequena")
      console.log(height)
      setStuffHeight(65)
      setImageHeight(144.032)
      setImageWidth(132.608)
      setFontSize(16)
      setTinyText(15)
    }
  })

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate("HomeStart");
    } catch (error) {
      console.log(error);
      alert("deu erro");
      alert("deu erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    
<>

      
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />
            <View style={[styles.inputArea, {height: (stuffHeight - 7)} ]} >
              <TextInput
                value={email}
                style={[styles.input, { fontSize: (fontSize - 2) }]}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
              <Feather name="mail" size={27} color={"rgba(0,0,0,0.5)"} />
            </View>
            <View style={[styles.inputArea, {height: (stuffHeight - 7)} ]} >
              <TextInput
                value={senha}
                style={[styles.input, { fontSize: (fontSize - 2) }]}
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={(text) => setSenha(text)}
                secureTextEntry={true}
              />
              <Feather name="lock" size={27} color={"rgba(0,0,0,0.5)"} />
            </View>
            <TouchableOpacity style={ styles.forgotPassword } onPress={ () => navigation.navigate('PasswordResets')}>
              <Text style={[styles.textForgor, { fontSize: tinyText }]} >Esqueci minha senha</Text>
            </TouchableOpacity>

            {loading ? (
              <ActivityIndicator size="30" color="#7EB77F" />
            ) : (
              <>
                <TouchableOpacity
                  title="Entrar"
                  style={[styles.buttonLogin, { height: stuffHeight }]}
                  onPress={SignIn}
                >
                  <Text style={[styles.text, { fontSize: fontSize }]}>Entrar</Text>
                </TouchableOpacity>
              </>
            )}
        </KeyboardAwareScrollView>
        

        </>

  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container:{
    minHeight: "100%",
    width: "100%",
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#FFF"
  },
  logo:{
    marginBottom: "10%",
    resizeMode: 'stretch'
  },
  inputArea:{
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderColor: '#dbdbdb',
    borderBottomWidth: 7,
    borderWidth: 4,
    width: "85%",
    marginBottom: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  input: {
    height: "100%",
    width: "80%",
  },
  buttonLogin: {
    marginTop: "7%",
    backgroundColor: '#A4CCA4',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#8eb28e',
    borderBottomWidth: 8,
    borderWidth: 5 
    
  },
  text: {
    fontWeight: 'bold',
    opacity: 0.5,
  },
  textForgor: {
    fontWeight: 'bold',
  },
  forgotPassword:{
    alignSelf: "center",
    opacity: 0.4,
  }
});
