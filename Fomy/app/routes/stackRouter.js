import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import Doces from "../screens/Trilhas/Doces";
import Basico from "../screens/Trilhas/Basico";
import Login from "../screens/initial";
import LoginPage from "../screens/login";
import Cadastro from "../screens/cadastro";
import Fetch from "../components/fetch/index"

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {<Stack.Screen
        name="Fetch"
        component={Fetch}
        options={{ headerShown: false }}
      /> }
      <Stack.Screen
        name="Doces"
        component={Doces}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Basico"
        component={Basico}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loginpage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}