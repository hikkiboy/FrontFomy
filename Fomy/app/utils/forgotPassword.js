import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { app_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from "../components/logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";
import { Feather } from 'react-native-vector-icons'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PasswordResets = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("coralinegaming93@gmail.com");
  const [senha, setSenha] = useState("");


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
    if(height <= 700){
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

{ Platform.OS === 'ios' ? (
          <>
              <Modal
                visible={loading}
                animationType="slide"
                transparent={true}
              >
                <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center', backgroundColor: bg }} >
                  <View style={{ backgroundColor: "#FFF", height: 325, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                    <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center'  }} >
                      <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >{ sent ?  ("Email enviado!") : ("Enviando Email...")}</Text>
                    </View>
                      { sent ?  (
                          <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'flex-start' }} >
                            <Feather style={{ marginTop: "-5%" }}  name="check" size={100} color="#70d872" />
                            <Text style={{ width: "90%", fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: "9%", marginTop: "1%" }} >Siga as instruções que enviamos</Text>
                            <TouchableOpacity onPress={() => {setTimeout(() => {setBg();}, 100); setTimeout(() => {setLoading(false);navigation.navigate("Loginpage")}, 120)}} style={{ width: "90%", alignItems: 'center', height: (stuffHeight - 5), justifyContent: 'center', borderRadius: 15, backgroundColor: '#70d872', borderWidth: 4, borderBottomWidth: 6, borderColor: '#62bc63' }} >
                              <Text style={{ fontSize: (fontSize + 1), opacity: 0.7, fontWeight: 'bold' }} >Voltar ao login</Text>
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
            >
              <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', backgroundColor: "rgba(0,0,0,0.10)", zIndex: 98 }} ></View>
            </Modal>
            <Modal
              visible={loading}
              animationType="slide"
              transparent={true}
            >
              <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center' }} >
                <View style={{ backgroundColor: "#FFF", height: 325, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                  <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center'  }} >
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >{ sent ?  ("Email enviado!") : ("Enviando Email...")}</Text>
                  </View>
                    { sent ?  (
                        <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'flex-start' }} >
                          <Feather style={{ marginTop: "-5%" }}  name="check" size={100} color="#70d872" />
                          <Text style={{ width: "90%", fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: "9%", marginTop: "1%" }} >Siga as instruções que enviamos</Text>
                          <TouchableOpacity onPress={() => {setLoading(false); navigation.navigate("Loginpage")}} style={{ width: "90%", alignItems: 'center', height: (stuffHeight - 5), justifyContent: 'center', borderRadius: 15, backgroundColor: '#70d872', borderWidth: 4, borderBottomWidth: 6, borderColor: '#62bc63' }} >
                            <Text style={{ fontSize: (fontSize + 1), opacity: 0.7, fontWeight: 'bold' }} >Voltar ao login</Text>
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
            visible={loading}
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center' }} >
              <View style={{ backgroundColor: "#FFF", height: 325, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center'  }} >
                  <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >{ sent ?  ("Email enviado!") : ("Enviando Email...")}</Text>
                </View>
                  { sent ?  (
                      <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'flex-start' }} >
                        <Feather style={{ marginTop: "-5%" }}  name="check" size={100} color="#70d872" />
                        <Text style={{ width: "90%", fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: "9%", marginTop: "1%" }} >Siga as instruções que enviamos</Text>
                        <TouchableOpacity onPress={() => {setLoading(false); navigation.navigate("Loginpage")}} style={{ width: "90%", alignItems: 'center', height: (stuffHeight - 5), justifyContent: 'center', borderRadius: 15, backgroundColor: '#70d872', borderWidth: 4, borderBottomWidth: 6, borderColor: '#62bc63' }} >
                          <Text style={{ fontSize: (fontSize + 1), opacity: 0.7, fontWeight: 'bold' }} >Voltar ao login</Text>
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
      <TouchableOpacity title="Enviar" style={[styles.buttonLogin, { height: stuffHeight }]} onPress={PasswordReset}>
        <Text style={[styles.text, { fontSize: fontSize }]}>Redefinir Senha</Text>
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
    backgroundColor: '#70d872',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#62bc63',
    borderBottomWidth: 8,
    borderWidth: 5 
  },
  text: {
    fontWeight: 'bold',
    color: "rgba(0,0,0,0.7)"
  },
});

export default PasswordResets;
