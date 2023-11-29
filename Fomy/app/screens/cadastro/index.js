import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements'
import { doc, setDoc } from "firebase/firestore"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Feather } from 'react-native-vector-icons'






const Cadastro = ({ navigation }) => {

    const height = Dimensions.get("window").height
    const [stuffHeight, setStuffHeight] = useState(70)
    const [imageHeight, setImageHeight] = useState(180.04)
    const [imageWidth, setImageWidth] = useState(165.76)
    const [fontSize, setFontSize] = useState(20)
    const [googleHeight, setGoogleHeight] = useState(32)
    const [googleWidth, setGoogleWidth] = useState(32)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = app_auth;

    useEffect(() => {
      if(height <= 700){
        console.log("tela pequena")
        console.log(height)
        setStuffHeight(65)
        setImageHeight(144.032)
        setImageWidth(132.608)
        setFontSize(16)
        setGoogleHeight(26)
        setGoogleWidth(26)
      }
    })

    const SignIn = async () => {
      setLoading(true)
      try{
        const response = await signInWithEmailAndPassword(auth, email, senha)
        

      } catch (error) {
        console.log(error)
        alert('deu erro')
      } finally{
        setLoading(false)
      }
    }

      const SignUp = async () => {
        setLoading(true)
        try{
          
          const response = await createUserWithEmailAndPassword(auth, email, senha)
 
          const Other = setNome(nome)
          const docRef = await setDoc(doc(app_DB, "Usuarios", response.user.uid), {
            Alergias:[],
            Exp : 0,
            Foto : "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Default-Profile-Picture-PNG-Photo-3895174684.png?alt=media&token=f70e36af-2857-405f-b307-5e7abe35f347",
            Itens: [],
            Moedas: 0,
            Nivel: 1,
            Nome : nome,
            Premium: false,
            ProgressoTrilhas: [],
            ReceitasFeitas: [],
            Insignias: ["Beta"],
            Titulo: "Iniciante"

          })

          
   
          navigation.navigate("HomeStart")
  
        } catch (error) {
          console.log(error)
          alert('Faio, Erro : ' + error)
        } finally{
          setLoading(false)
        }
    }
  
   return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} >
        {/* scroll views are fucking STUPID, specially keyboard avoiding ones */}
        {/* nvm, I found a way using (minHeight: "100%", width: "100%") instead of (flex: 1) */}
        <Image style={[styles.logo, { width: imageWidth, height: imageHeight }]} source={require("../../assets/logo-full.png")} />

        <View style={[styles.inputArea, {height: (stuffHeight - 7)} ]} >
          <TextInput value= {nome} style={[styles.input, { fontSize: (fontSize - 2) }]} placeholder='Nome' autoCapitalize='none' onChangeText={(text) => setNome(text)}/>
          <Feather name="user" size={27} color={"rgba(0,0,0,0.5)"} />
        </View>
        <View style={[styles.inputArea, {height: (stuffHeight - 7)} ]} >
          <TextInput value={email} style = {[styles.input, { fontSize: (fontSize - 2) }]} placeholder='Email' autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}/>
          <Feather name="mail" size={27} color={"rgba(0,0,0,0.5)"} />
        </View>
        <View style={[styles.inputArea, {height: (stuffHeight - 7)} ]} >
          <TextInput value={senha} style = {[styles.input, { fontSize: (fontSize - 2) }]} placeholder='Senha' autoCapitalize='none'
          onChangeText={(text) => setSenha(text)} secureTextEntry={true}/>
          <Feather name="lock" size={27} color={"rgba(0,0,0,0.5)"} />
        </View>

          {loading ? (
            <ActivityIndicator size="30" color="#7EB77F" />
          ) : (
            <>
          <TouchableOpacity style = {[styles.buttonLogin, { height: stuffHeight }]} title = 'Registrar' onPress={SignUp}>
          <Text style={[styles.text, {fontSize: fontSize}]}>Começar jornada!</Text>
          </TouchableOpacity>
            </>
          )}

        </KeyboardAwareScrollView>

  );
};
export default Cadastro;

const styles = StyleSheet.create({
  container:{
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
  forgotPassword:{
    alignSelf: "center",
    opacity: 0.4
  }
});