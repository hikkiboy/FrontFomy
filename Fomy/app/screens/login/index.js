import {
  StyleSheet,
  Platform,
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
  Dimensions,
  Modal
} from "react-native";
import React, { useState, useEffect } from "react";
import { app_auth } from "../../../firebaseConfig";
import { Logo } from "../../components/logo";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

import { Feather, FontAwesome6 } from 'react-native-vector-icons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ navigation }) => {

  const height = Dimensions.get("window").height;
  const [stuffHeight, setStuffHeight] = useState(70);
  const [imageHeight, setImageHeight] = useState(180.04);
  const [imageWidth, setImageWidth] = useState(165.76);
  const [fontSize, setFontSize] = useState(20);
  const [tinyText, setTinyText] = useState(17);

  const [email, setEmail] = useState("coralinegaming93@gmail.com");
  const [senha, setSenha] = useState("123456");

  const [bg, setBg] = useState();
  const [loading, setLoading] = useState(false);
  const [entered, setEntered] = useState(false);
  const [problem, setProblem] = useState(false);
  const [whatError, setWhatError] = useState("");
  const auth = app_auth;

  useEffect(() => {
    if (height <= 700) {
      //console.log("tela pequena")
      //console.log(height)
      setStuffHeight(65)
      setImageHeight(144.032)
      setImageWidth(132.608)
      setFontSize(16)
      setTinyText(15)
    }
  })

  const SignIn = async () => {
    setLoading(true);
    setTimeout(() => {
      setBg("rgba(0,0,0,0.1)");
    }, 250)
    setEntered(false);
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);

      setEntered(true);
      setTimeout(() => {
        setBg();
        setTimeout(() => { setLoading(false); }, 20);
      }, 185);

    } catch (error) {
      setTimeout(() => {
        setBg();
        setLoading(false);
      }, 200);
      setTimeout(() => {
        setProblem(true);
      }, 200);
      console.log("erro: " + error);
      if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
        setWhatError("Email inválido!");
      } else if (error == "FirebaseError: Firebase: Error (auth/invalid-login-credentials).") {
        setWhatError("Email ou senha errada!");
      } else if (error == "FirebaseError: Firebase: Error (auth/missing-password).") {
        setWhatError("Coloque uma senha!");
      } else {
        setWhatError("Ocorreu um erro com seu login: " + error);
      }
    }
  };

  return (

    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {Platform.OS === 'ios' ? (
        <>
          <Modal
            visible={loading}
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center', backgroundColor: bg }} >
              <View style={{ backgroundColor: "#FFF", height: 275, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center' }} >
                  <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >{entered ? ("Sucesso!") : ("Entrando...")}</Text>
                </View>
                <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                  {entered ? (
                    <Feather name="check" size={120} color="#fab151" />
                  ) : (
                    <ActivityIndicator color="#fab151" />
                  )
                  }
                </View>

              </View>
            </View>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            visible={loading}
            animationType="fade"
            transparent={true}
          >
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', backgroundColor: "rgba(0,0,0,0.10)", zIndex: 98 }} ></View>
          </Modal>
          <Modal
            visible={loading}
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center' }} >
              <View style={{ backgroundColor: "#FFF", height: 275, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center' }} >
                  <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >{entered ? ("Sucesso!") : ("Entrando...")}</Text>
                </View>
                <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                  {entered ? (
                    <Feather name="check" size={120} color="#fab151" />
                  ) : (
                    <ActivityIndicator size={90} color="#fab151" />
                  )
                  }
                </View>

              </View>
            </View>
          </Modal>
        </>
      )
      }
      <Modal
        visible={problem}
        transparent={true}
        animationType='fade'
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.2)" }} >
          <View style={{ alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, width: "90%", paddingVertical: 20, paddingBottom: 30 }} >
            <Feather name="alert-triangle" size={80} color="#fa787d" />
            <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: "12%", marginTop: "3%", width: "90%", textAlign: 'center' }} >{whatError}</Text>
            <TouchableOpacity style={{ backgroundColor: "#fa787d", width: "90%", alignItems: 'center', justifyContent: 'center', borderRadius: 15, height: 45, borderWidth: 4, borderBottomWidth: 6, borderColor: '#f1555a' }} onPress={() => setProblem(false)} >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', opacity: 0.7 }} >Beleza, foi mal!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />
      <View style={[styles.inputArea, { height: (stuffHeight - 7) }]} >
        <TextInput
          value={email}
          style={[styles.input, { fontSize: (fontSize - 2) }]}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <FontAwesome6 name="at" size={25} color={"#303030"} />
      </View>
      <View style={[styles.inputArea, { height: (stuffHeight - 7) }]} >
        <TextInput
          value={senha}
          style={[styles.input, { fontSize: (fontSize - 2) }]}
          placeholder="Senha"
          autoCapitalize="none"
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />
        <FontAwesome6 name="lock" size={25} color={"#303030"} />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.forgotPassword} onPress={() => navigation.navigate('PasswordResets')}>
        <Text style={[styles.textForgor, { fontSize: tinyText }]} >Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Entrar"
        style={[styles.buttonLogin, { height: stuffHeight }]}
        onPress={SignIn}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, { fontSize: fontSize }]}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>

  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF"
  },
  logo: {
    marginBottom: "10%",
    resizeMode: 'stretch'
  },
  inputArea: {
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
    backgroundColor: '#fab151',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#ed8a07',
    borderBottomWidth: 8,
    borderWidth: 5

  },
  text: {
    fontWeight: 'bold',
    opacity: 0.7,
  },
  textForgor: {
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: "center",
    opacity: 0.4,
  }
});
