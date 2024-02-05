import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { User, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { app_auth } from "./firebaseConfig";

import Routes, { TabNavigatior } from "./app/routes/stackRouter";
import LoginPage from "./app/screens/login";
import Login from "./app/screens/initial";

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = onAuthStateChanged(app_auth, (user) => {
      if(user) {
        setLoggedIn(true);
        //console.log("logado");
        setLoading(false);
      } else {
        setLoggedIn(false);
        //console.log("não tá logado");
        setLoading(false);
      }
     
    });

    return () => login();
  }, []);

  return (
    <NavigationContainer>
      <Routes loggedIn={loggedIn} loading={loading} />
    </NavigationContainer>
  );
}