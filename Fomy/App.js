import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { useFonts, Fredoka_300Light, Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

import { useEffect, useState } from "react";
import { app_auth } from "./firebaseConfig";

import Routes, { TabNavigatior } from "./app/routes/stackRouter";

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    "FredokaLight": Fredoka_300Light,
    "FredokaRegular": Fredoka_400Regular,
    "FredokaMedium": Fredoka_500Medium,
    "FredokaSemibold": Fredoka_600SemiBold,
    "FredokaBold": Fredoka_700Bold
  });


  useEffect(() => {
    const login = onAuthStateChanged(app_auth, (user) => {
      if(user && fontsLoaded) {
        setLoggedIn(true);
        //console.log("logado");
        setLoading(false);
      } else if (fontsLoaded) {
        setLoggedIn(false);
        //console.log("não tá logado");
        setLoading(false);
      }
     
    });

    return () => login();
  }, [fontsLoaded]);

  return (
    <NavigationContainer>
      <Routes loggedIn={loggedIn} loading={loading} />
    </NavigationContainer>
  );
}