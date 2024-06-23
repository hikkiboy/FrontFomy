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

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
    if (senha == "" || email == "") {
      setTimeout(() => {
        setBg();
        setLoading(false);
      }, 200);
      setWhatError("Preencha todos os campos!")
      setTimeout(() => {
        setProblem(true);
      }, 200);
    } else {
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
                  <Text style={{ textAlign: 'center', fontSize: 28, fontFamily: "FredokaBold", color: "#303030" }} >{entered ? ("Sucesso!") : ("Entrando...")}</Text>
                </View>
                <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                  {entered ? (
                    <FontAwesome6 name="check" size={120} color="#fab151" />
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
            style={{ zIndex: 98 }}
          >
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', backgroundColor: "rgba(0,0,0,0.10)", zIndex: 98 }} ></View>
          </Modal>
          <Modal
            visible={loading}
            animationType="slide"
            transparent={true}
            style={{ zIndex: 99 }}
          >
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center' }} >
              <View style={{ backgroundColor: "#FFF", height: 275, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center' }} >
                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 28, fontFamily: "FredokaBold", color: "#303030" }} >{entered ? ("Sucesso!") : ("Entrando...")}</Text>
                </View>
                <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                  {entered ? (
                    <FontAwesome6 name="check" size={120} color="#fab151" />
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.2)", paddingHorizontal: 10 }} >
          <View style={{ alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, width: "100%", paddingVertical: 30, paddingHorizontal: 10 }} >
            <FontAwesome6 name="triangle-exclamation" size={80} color="#f1555a" />
            <Text allowFontScaling={false} style={{ fontSize: 25, color: "#f1555a", fontFamily: "FredokaSemibold", marginBottom: 20, marginTop: 15, width: "100%", textAlign: 'center', paddingHorizontal: 10 }} >Ocorreu um erro!</Text>
            <Text allowFontScaling={false} style={{ fontSize: 21, color: "#505050", fontFamily: "FredokaMedium", marginBottom: 45, width: "100%", textAlign: 'center', paddingHorizontal: 10 }} >{whatError}</Text>
            <TouchableOpacity style={{ backgroundColor: "#fa787d", width: "100%", alignItems: 'center', justifyContent: 'center', borderRadius: 15, paddingVertical: 8, borderWidth: 6, borderBottomWidth: 9, borderColor: '#f1555a' }} onPress={() => setProblem(false)} >
              <Text allowFontScaling={false} style={{ fontSize: 24, fontFamily: "FredokaSemibold", color: "#303030" }} >Beleza, foi mal!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />
      <View style={[styles.inputArea, { height: (stuffHeight - 7) }]} >
        <TextInput
          allowFontScaling={false}
          value={email}
          style={[styles.input, { fontSize: (fontSize - 2) }]}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <FontAwesome6 name="at" size={25} color={"#303030"} />
      </View>
      <View style={[styles.inputArea, { height: (stuffHeight - 7), marginBottom: 20 }]} >
        <TextInput
          allowFontScaling={false}
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
        <Text allowFontScaling={false} style={[styles.textForgor, { fontSize: tinyText + 1 }]} >Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonLogin, { height: stuffHeight }]}
        onPress={SignIn}
        activeOpacity={0.8}
      >
        <Text allowFontScaling={false} style={[styles.text, { fontSize: fontSize }]}>Entrar</Text>
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
    fontFamily: "FredokaMedium"
  },
  buttonLogin: {
    marginTop: 30,
    backgroundColor: '#fab151',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#ed8a07',
    borderBottomWidth: 9,
    borderWidth: 6

  },
  text: {
    fontFamily: "FredokaSemibold",
    color: "#303030",
  },
  textForgor: {
    fontFamily: "FredokaMedium",
    color: "#505050"
  },
  forgotPassword: {
    alignSelf: "center",
  }
});
