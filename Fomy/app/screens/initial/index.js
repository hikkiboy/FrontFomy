import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, Dimensions, BackHandler, Platform, Modal, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import * as Web from 'expo-web-browser'
import { User, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useState, useEffect } from 'react'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { Logo } from '../../components/logo';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar'
import { LogBox } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FontAwesome6 } from 'react-native-vector-icons'



Web.maybeCompleteAuthSession();
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Login = ({ navigation }) => {
  const height = Dimensions.get("window").height
  const [stuffHeight, setStuffHeight] = useState(85)
  const [imageHeight, setImageHeight] = useState(225.05)
  const [imageWidth, setImageWidth] = useState(207.2)
  const [fontSize, setFontSize] = useState(23)
  const [googleHeight, setGoogleHeight] = useState(32)
  const [googleWidth, setGoogleWidth] = useState(32)
  const [tinyText, setTinyText] = useState(23);
  const [problem, setProblem] = useState(false);

  const [bg, setBg] = useState();
  const [loading, setLoading] = useState(false);
  const [entered, setEntered] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "27576730639-u9q1d4970q4oeb86dmfl69us2urnlibh.apps.googleusercontent.com",
  })

  useEffect(() => {
    if (response?.type == 'success') {
      setLoading(true);
      setTimeout(() => {
        setBg("rgba(0,0,0,0.1)");
      }, 250)
      setEntered(false);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(app_auth, credential).then(async () => {
        const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log("Document already exists");
          setEntered(true);
          setTimeout(() => {
            setBg();
            setTimeout(() => { setLoading(false); }, 20);
          }, 185);
        } else {
          try {
            const nameAccount = app_auth.currentUser.displayName ? app_auth.currentUser.displayName : "Alberto"
            await setDoc(userRef, {
              Alergias: [],
              Exp: 0,
              Foto: "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Pfps%2Falbertobutpfp.png?alt=media&token=d75260c5-3ad6-4142-a202-4d127b293cf4",
              Itens: [],
              Moedas: 0,
              Nivel: 1,
              Nome: nameAccount,
              Premium: false,
              ReceitasFeitas: [],
              Insignias: ["Beta"],
              Titulo: "Iniciante",
              Básico: 0,
              Doces: 0,
              Gourmet: 0,
              Refeições: 0,
              ItensAli: ["chef", "", "", ""],
              ExpLevel: 50
            });
            setEntered(true);
            setTimeout(() => {
              setBg();
              setTimeout(() => { setLoading(false); }, 20);
            }, 185);
            console.log("Document created successfully");
          } catch (error) {
            console.error("Error adding document: ", error);
            app_auth.signOut()
            setProblem(true)
          }
        }
      })
    }
  }, [response]);

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('#FFF');
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
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

  }, [isFocused])

  useEffect(() => {
    if (height <= 700) {
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
            <Text allowFontScaling={false} style={{ fontSize: 21, color: "#505050", fontFamily: "FredokaMedium", marginBottom: 45, width: "100%", textAlign: 'center', paddingHorizontal: 10 }} >Tente novamente mais tarde ou use um outro método</Text>
            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "#fa787d", width: "100%", alignItems: 'center', justifyContent: 'center', borderRadius: 15, paddingVertical: 8, borderWidth: 6, borderBottomWidth: 9, borderColor: '#f1555a' }} onPress={() => setProblem(false)} >
              <Text allowFontScaling={false} style={{ fontSize: 24, fontFamily: "FredokaSemibold", color: "#303030" }} >Eita poxa!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />

      <TouchableOpacity activeOpacity={0.8} style={[styles.buttonCadastro, { height: stuffHeight }]} onPress={() => navigation.navigate('Cadastro')}>
        <Text allowFontScaling={false} style={[styles.login, { fontSize: fontSize }]}>Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={[styles.buttonLogin, { height: stuffHeight }]} onPress={() => navigation.navigate('Loginpage')}>
        <Text allowFontScaling={false} style={[styles.login, { fontSize: fontSize }]}>Login</Text>
      </TouchableOpacity>


      {/* <Image style={{width: "50%", height: "0.9%", resizeMode: "stretch", marginVertical: "10%"}} source={require("../../assets/lines-detail.png")} /> */}

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
        <Octicons name="dash" size={80} color="#dbdbdb" />
        <Text allowFontScaling={false} style={[styles.otherOptions, { fontSize: tinyText }]}> ou </Text>
        <Octicons name="dash" size={80} color="#dbdbdb" />
      </View>

      <TouchableOpacity activeOpacity={0.8} style={[styles.buttonCadastroGoogle, { height: (stuffHeight - 10) }]} onPress={() => promptAsync()}>

        <Text allowFontScaling={false} style={[styles.login, { fontSize: fontSize, color: "#303030" }]} >Entre com </Text>
        <Text allowFontScaling={false} style={{ color: "#4285f4", fontSize: fontSize, fontFamily: 'FredokaSemibold' }} >G</Text>
        <Text allowFontScaling={false} style={{ color: "#ea4335", fontSize: fontSize, fontFamily: 'FredokaSemibold' }} >o</Text>
        <Text allowFontScaling={false} style={{ color: "#fbbc05", fontSize: fontSize, fontFamily: 'FredokaSemibold' }} >o</Text>
        <Text allowFontScaling={false} style={{ color: "#4285f4", fontSize: fontSize, fontFamily: 'FredokaSemibold' }} >g</Text>
        <Text allowFontScaling={false} style={{ color: "#34a853", fontSize: fontSize, fontFamily: 'FredokaSemibold' }} >l</Text>
        <Text allowFontScaling={false} style={{ color: "#ea4335", fontSize: fontSize, fontFamily: 'FredokaSemibold' }} >e</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
}
export default Login





const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFF"

  },
  logo: {
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
    borderBottomWidth: 9,
    borderWidth: 6
  },
  buttonLogin: {
    backgroundColor: '#fab151',
    width: "85%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#ed8a07',
    borderBottomWidth: 9,
    borderWidth: 6,
    marginTop: "5%"

  },
  login: {
    fontFamily: "FredokaSemibold",
    color: "#303030"
  },
  loginGoogle: {
    fontSize: 28,
    color: "#FFF"
  },
  buttonCadastroGoogle: {
    backgroundColor: '#FFF',
    width: "85%",
    borderRadius: 15,
    borderColor: '#dbdbdb',
    borderBottomWidth: 9,
    borderWidth: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginsDiff: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  otherOptions: {
    marginHorizontal: 10,
    marginBottom: 5,
    color: "#505050",
    fontFamily: "FredokaSemibold"

  },



});





