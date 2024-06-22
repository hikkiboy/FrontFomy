import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator, Dimensions, Modal, Platform } from 'react-native';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements'
import { doc, setDoc } from "firebase/firestore";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Feather, FontAwesome6, FontAwesome } from 'react-native-vector-icons'
import { Overlay } from 'react-native-elements';
import { ModalTerm } from '../../components/actionmodal/modalterms';
import Checkbox from 'expo-checkbox';









const Cadastro = ({ navigation }) => {

  const height = Dimensions.get("window").height;
  const [stuffHeight, setStuffHeight] = useState(70);
  const [imageHeight, setImageHeight] = useState(180.04);
  const [imageWidth, setImageWidth] = useState(165.76);
  const [fontSize, setFontSize] = useState(20);
  const [googleHeight, setGoogleHeight] = useState(32);
  const [googleWidth, setGoogleWidth] = useState(32);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [bg, setBg] = useState();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [problem, setProblem] = useState(false);
  const [whatError, setWhatError] = useState("");
  const auth = app_auth;

  const [isChecked, setChecked] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (height <= 700) {
      //console.log("tela pequena");
      //console.log(height);
      setStuffHeight(65);
      setImageHeight(144.032);
      setImageWidth(132.608);
      setFontSize(16);
      setGoogleHeight(26);
      setGoogleWidth(26);
    }
  })

  const SignUp = async () => {
    setLoading(true)
    setTimeout(() => {
      setBg("rgba(0,0,0,0.1)");
    }, 250)
    setCreated(false)
    if (nome == "" || senha == "" || email == "" || isChecked == false) {
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

        const response = await createUserWithEmailAndPassword(auth, email, senha)

        const Other = setNome(nome)
        const docRef = await setDoc(doc(app_DB, "Usuarios", response.user.uid), {
          Alergias: [],
          Exp: 0,
          Foto: "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Pfps%2Falbertobutpfp.png?alt=media&token=d75260c5-3ad6-4142-a202-4d127b293cf4",
          Itens: [],
          Moedas: 0,
          Nivel: 1,
          Nome: nome,
          Premium: false,
          ReceitasFeitas: [],
          Insignias: ["Beta"],
          Titulo: "Iniciante",
          Básico: 0,
          Doces: 0,
          Gourmet: 0,
          Refeições: 0,
          ItensAli: ["chef","","",""],
          ExpLevel: 50

        })

        setCreated(true);
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
        console.log("erro: " + error)
        if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
          setWhatError("Email inválido!")
        } else if (error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).") {
          setWhatError("Senha fraca, coloque uma com pelo menos 6 caractéres.")
        } else if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
          setWhatError("O email já está em uso.")
        } else {
          setWhatError("Ocorreu um erro com seu cadastro: " + error)
        }
      }
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} >
      {/* scroll views are fucking STUPID, specially keyboard avoiding ones */}
      {/* nvm, I found a way using (minHeight: "100%", width: "100%") instead of (flex: 1) */}

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
                  <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: "FredokaBold" }} >{created ? ("Perfil criado!") : ("Criando perfil...")}</Text>
                </View>
                <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                  {created ? (
                    <Feather name="check" size={120} color="#70d872" />
                  ) : (
                    <ActivityIndicator color="#70d872" />
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
                  <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: "FredokaBold" }} >{created ? ("Perfil criado!") : ("Criando perfil...")}</Text>
                </View>
                <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                  {created ? (
                    <Feather name="check" size={120} color="#70d872" />
                  ) : (
                    <ActivityIndicator size={90} color="#70d872" />
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
            <Text style={{ fontSize: 19, fontFamily: "FredokaSemibold", marginBottom: "12%", marginTop: "3%", width: "90%", textAlign: 'center' }} >{whatError}</Text>
            <TouchableOpacity style={{ backgroundColor: "#fa787d", width: "90%", alignItems: 'center', justifyContent: 'center', borderRadius: 15, height: 45, borderWidth: 4, borderBottomWidth: 6, borderColor: '#f1555a' }} onPress={() => setProblem(false)} >
              <Text style={{ fontSize: 18, fontFamily: "FredokaSemibold", color: '#000', opacity: 0.7 }} >Beleza, foi mal!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />

      <View style={[styles.inputArea, { height: (stuffHeight - 7) }]} >
        <TextInput value={nome} style={[styles.input, { fontSize: (fontSize - 2) }]} placeholder='Nome' autoCapitalize='none' onChangeText={(text) => setNome(text)} />
        <FontAwesome6 name="user-large" size={25} color={"#303030"} />
      </View>
      <View style={[styles.inputArea, { height: (stuffHeight - 7) }]} >
        <TextInput value={email} style={[styles.input, { fontSize: (fontSize - 2) }]} placeholder='Email' autoCapitalize='none'
          onChangeText={(text) => setEmail(text)} />
        <FontAwesome6 name="at" size={25} color={"#303030"} />
      </View>
      <View style={[styles.inputArea, { height: (stuffHeight - 7) }]} >
        <TextInput value={senha} style={[styles.input, { fontSize: (fontSize - 2) }]} placeholder='Senha' autoCapitalize='none'
          onChangeText={(text) => setSenha(text)} secureTextEntry={true} />
        <FontAwesome6 name="lock" size={25} color={"#303030"} />
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={"green"} />
        <Text style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', textAlign: 'center', fontSize: fontSize - 5, fontFamily: "FredokaMedium" }} >Concordo com a </Text>
        <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.8} onPress={handleOpenModal} >
          <Text style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', textAlign: 'center', fontSize: fontSize - 5, color: "green", fontFamily: "FredokaMedium" }}>política de privacidade</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={[styles.buttonLogin, { height: stuffHeight }]} title='Registrar' onPress={SignUp}>
        <Text style={[styles.text, { fontSize: fontSize }]}>Começar jornada!</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalTerm handleCloseModal={handleCloseModal} />
      </Modal>

    </KeyboardAwareScrollView>

  );
};
export default Cadastro;

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
    borderBottomWidth: 8,
    borderWidth: 5
  },
  text: {
    fontFamily: "FredokaSemibold",
    opacity: 0.7,
  },
  forgotPassword: {
    alignSelf: "center",
    opacity: 0.4
  },

  modalArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62bc63',
  },
  buttonPolitics: {
    marginTop: "7%",
    backgroundColor: '#70d872',
    width: "35%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#62bc63',
    borderBottomWidth: 8,
    borderWidth: 5
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    borderRadius: 5,


  },


});