import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { app_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from "../components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordResets = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = app_auth;

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
    <SafeAreaView>    
        <Logo/>
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />


      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity title="Enviar" style={styles.buttonLogin} onPress={PasswordReset}>
          <Text style={styles.text}>Enviar</Text>
        </TouchableOpacity>
      )}
    </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    padding: 15,
  },
  container:{
    marginBottom: 450
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
});

export default PasswordResets;
