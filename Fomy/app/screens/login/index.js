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
  const [email, setEmail] = useState("teste@teste.com");
  const [senha, setSenha] = useState("senhasenha");

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
    } finally {
      setLoading(false);
    }
  };

  return (
    
    
<>

      
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Logo/>
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
    flex: 1
  },
  input: {
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignSelf: "center",
    padding: 15,
  },
  buttonRegistro: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 13,
    paddingLeft: 42,
    paddingRight: 42,
    borderRadius: 20,
    borderColor: "black",
    borderBottomWidth: 7,
    borderWidth: 3,
    margin: 3,
    width: 250,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  buttonLogin: {
    backgroundColor: "#7EB77F",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 13,
    paddingLeft: 40,
    paddingRight: 40,
    //borderBottomStartRadius: 0,
    //borderBottomEndRadius: 0,
    borderColor: "black",
    borderWidth: 3,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10,
    width: 250,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  forgotPassword:{
    alignSelf: "center",
    opacity: 0.4
  }
});