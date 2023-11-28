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
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import { app_auth } from "../../../firebaseConfig";
import { Logo } from "../../components/logo";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("coralinegaming93@gmail.com");
  const [senha, setSenha] = useState("1234567");
  
  const [loading, setLoading] = useState(false);
  const auth = app_auth;

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate("Profile");
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

      
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.logo} source={require("../../assets/logo-full.png")} />
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            value={senha}
            style={styles.input}
            placeholder="Senha"
            autoCapitalize="none"
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity style={styles.forgotPassword} onPress={ () => navigation.navigate('PasswordResets')}>
            <Text>Esqueci minha senha</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity
                title="Entrar"
                style={styles.buttonLogin}
                onPress={SignIn}
              >
                <Text style={styles.text}>Entrar</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
        

        </>

  );
};
export default LoginPage;

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
  input: {
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderRadius: 15,
    borderColor: '#dbdbdb',
    borderBottomWidth: 7,
    borderWidth: 4,
    width: 300,
    alignSelf: "center",
    padding: 15,
    marginBottom: 15
  },
  buttonRegistro: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 13,
    paddingLeft: 42,
    paddingRight: 42,
    borderRadius: 15,
    borderRadius: 15,
    borderColor: "black",
    borderBottomWidth: 7,
    borderWidth: 3,
    margin: 3,
    width: 250,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  buttonLogin: {
    
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    
    paddingLeft: 40,
    paddingRight: 40,
    //borderBottomStartRadius: 0,
    //borderBottomEndRadius: 0,
    
    backgroundColor: '#A4CCA4',
    padding: 12,
    width: "85%",
    borderRadius: 15,
    borderColor: '#8eb28e',
    borderBottomWidth: 8,
    borderWidth: 5,
    marginTop: 20,
    marginBottom: 5,
    height: 60,
    
    
    
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    opacity: 0.5,
  },
  forgotPassword:{
    alignSelf: "center",
    opacity: 0.4,
    marginBottom: 25
  }
});
