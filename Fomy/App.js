import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { app_auth } from "./firebaseConfig";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import{
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,

} from 'firebase/auth'
import Routes, { TabNavigatior } from "./app/routes/stackRouter";

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const [userInfo, setUserInfo] = useState()
  const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: '27576730639-3u8tl40g33u9rjhh4ollpnpbacl1c756.apps.googleusercontent.com'
  }, [promptAsync])

  useEffect(() => {
      if(response?.type=='success') {
          const { id_token } = response.params
          const credential = GoogleAuthProvider.credential(id_token)
          signInWithCredential(app_auth, credential)
      }
  }, [response])

  useEffect(()=>{
    const unsub = onAuthStateChanged(app_auth, async (user) => {
      if(user){
        console.log(JSON.stringify(user, null, 2))
        setUserInfo(user)
      }else{
        console.log('erro')
      }
    })

    return () => unsub()
  }, [])


  const [user, SetUser] = useState();

  useEffect(() => {
    onAuthStateChanged(app_auth, (user) => {
      SetUser(user);
     
    });
  }, []);

  return (
  <NavigationContainer><Routes promptAsync={promptAsync}/></NavigationContainer>  
  )
}