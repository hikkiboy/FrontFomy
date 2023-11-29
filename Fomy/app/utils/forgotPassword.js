import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { app_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from "../components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";
import { Feather } from 'react-native-vector-icons'

const PasswordResets = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = app_auth;


  const height = Dimensions.get("window").height
  const [stuffHeight, setStuffHeight] = useState(70)
  const [imageHeight, setImageHeight] = useState(225.05)
  const [imageWidth, setImageWidth] = useState(207.2)
  const [fontSize, setFontSize] = useState(20)

  useEffect(() => {
    if(height <= 700){
      console.log("tela pequena")
      console.log(height)
      setStuffHeight(65)
      setImageHeight(180.04)
      setImageWidth(165.76)
      setFontSize(16)
    }
  })

  const PasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Um email de redefinição de senha foi enviado para o seu endereço de email. Verifique sua caixa de entrada.");
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao enviar o email de redefinição de senha. Verifique o endereço de email fornecido.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>    
      <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../assets/logo-full.png")} />
      
      <View style={[styles.inputArea, {height: (stuffHeight - 2)} ]} >
          <TextInput
            value={email}
            style={[styles.input, { fontSize: (fontSize - 2) }]}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
        <Feather name="mail" size={27} color={"rgba(0,0,0,0.5)"} />
      </View>


      {loading ? (
        <ActivityIndicator size="30" color="#7EB77F" />
      ) : (
        <TouchableOpacity title="Enviar" style={[styles.buttonLogin, { height: stuffHeight }]} onPress={PasswordReset}>
          <Text style={[styles.text, { fontSize: fontSize }]}>Enviar</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#FFF"
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
});

export default PasswordResets;
