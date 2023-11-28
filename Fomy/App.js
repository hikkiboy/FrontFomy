import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { User, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import Login from "./app/screens/initial";

import { useEffect, useState } from "react";
import { app_auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Routes, { TabNavigatior } from "./app/routes/stackRouter";

//Captura quando a pessoa quer logar, e abre o browser em um modal ou dentro do app (talvez só p ios)
WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

export default function App() {
  const [user, SetUser] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "27576730639-s5jlear7di4c8pmld8sqe3fqeo5qg601.apps.googleusercontent.com",
    androidClientId: "27576730639-f5up9pq9f3fcvbn2lltms4sura2sn8uv.apps.googleusercontent.com"
  });



  useEffect(() => {
    onAuthStateChanged(app_auth, (user) => {
      SetUser(user);
     
    });

    if(response?.type == "success") {

      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(app_auth, credential)
    }

  }, [response]);

  return (
    <NavigationContainer>
      <Login promptAsync={promptAsync} />
    </NavigationContainer>
  );
}