import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions, Modal, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { app_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from "../components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";
import { Feather, FontAwesome6 } from 'react-native-vector-icons'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PasswordResets = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");


  const [bg, setBg] = useState();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [problem, setProblem] = useState(false);
  const [whatError, setWhatError] = useState("");
  const auth = app_auth;


  const height = Dimensions.get("window").height
  const [stuffHeight, setStuffHeight] = useState(70)
  const [imageHeight, setImageHeight] = useState(225.05)
  const [imageWidth, setImageWidth] = useState(207.2)
  const [fontSize, setFontSize] = useState(20)

  useEffect(() => {
    if (height <= 700) {
      //console.log("tela pequena")
      //console.log(height)
      setStuffHeight(65)
      setImageHeight(180.04)
      setImageWidth(165.76)
      setFontSize(16)
    }
  })

  const PasswordReset = async () => {
    setLoading(true);
    setTimeout(() => {
      setBg("rgba(0,0,0,0.1)");
    }, 250);
    setSent(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true)
    } catch (error) {
      setWhatError("Email inválido.");
      setTimeout(() => {
        setBg();
        setLoading(false);
      }, 200);
      setTimeout(() => {
        setProblem(true);
      }, 200);
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
              <View style={{ backgroundColor: "#FFF", height: 325, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center' }} >
                  <Text allowFontScaling={false} style={{ textAlign: 'center', color: "#303030", fontSize: 25, fontFamily: "FredokaBold" }} >{sent ? ("Email enviado!") : ("Enviando Email...")}</Text>
                </View>
                {sent ? (
                  <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'flex-start' }} >
                    <FontAwesome6 style={{ marginTop: "-5%" }} name="check" size={100} color="#70d872" />
                    <Text allowFontScaling={false} style={{ width: "90%", fontSize: 18, color: "#303030", textAlign: 'center', fontFamily: "FredokaMedium", marginBottom: "9%", marginTop: "1%" }} >Siga as instruções que enviamos</Text>
                    <TouchableOpacity onPress={() => { setTimeout(() => { setBg(); }, 100); setTimeout(() => { setLoading(false); navigation.navigate("Loginpage") }, 120) }} style={{ width: "90%", alignItems: 'center', height: (stuffHeight - 5), justifyContent: 'center', borderRadius: 15, backgroundColor: '#70d872', borderWidth: 4, borderBottomWidth: 6, borderColor: '#62bc63' }} >
                      <Text allowFontScaling={false} style={{ fontSize: (fontSize + 1), color: "#303030", fontFamily: "FredokaSemibold" }} >Voltar ao login</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                    <ActivityIndicator size={90} color="#70d872" />
                  </View>
                )
                }


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
              <View style={{ backgroundColor: "#FFF", height: 325, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center' }} >
                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 28, fontFamily: "FredokaBold", color: "#303030" }} >{sent ? ("Email enviado!") : ("Enviando Email...")}</Text>
                </View>
                {sent ? (
                  <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'flex-start' }} >
                    <FontAwesome6 style={{ marginTop: "-5%" }} name="check" size={100} color="#70d872" />
                    <Text allowFontScaling={false} style={{ width: "90%", fontSize: 18, color: "#303030", textAlign: 'center', fontFamily: "FredokaMedium", marginBottom: "9%", marginTop: "1%" }} >Siga as instruções que enviamos</Text>
                    <TouchableOpacity onPress={() => { setLoading(false); navigation.navigate("Loginpage") }} style={{ width: "90%", alignItems: 'center', height: (stuffHeight - 5), justifyContent: 'center', borderRadius: 15, backgroundColor: '#70d872', borderWidth: 6, borderBottomWidth: 9, borderColor: '#62bc63' }} >
                      <Text allowFontScaling={false} style={{ fontSize: (fontSize + 1), color: "#303030", fontFamily: "FredokaSemibold" }} >Voltar ao login</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                    <ActivityIndicator size={90} color="#70d872" />
                  </View>
                )
                }


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

      <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../assets/logo-full.png")} />

      <View style={[styles.inputArea, { height: (stuffHeight - 2) }]} >
        <TextInput allowFontScaling={false}
          value={email}
          style={[styles.input, { fontSize: (fontSize - 2) }]}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <FontAwesome6 name="at" size={25} color={"#303030"} />
      </View>
      <TouchableOpacity title="Enviar" style={[styles.buttonLogin, { height: stuffHeight }]} onPress={PasswordReset}>
        <Text allowFontScaling={false} style={[styles.text, { fontSize: fontSize }]}>Redefinir Senha</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>

  );
};

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
    marginTop: "7%",
    backgroundColor: '#70d872',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#62bc63',
    borderBottomWidth: 9,
    borderWidth: 6
  },
  text: {
    color: "#303030",
    fontFamily: "FredokaSemibold"
  },
});

export default PasswordResets;
