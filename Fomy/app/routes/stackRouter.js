import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Entypo } from '@expo/vector-icons';

import Profile from "../screens/profile";
import Doces from "../screens/Trilhas/Doces";
import Basico from "../screens/Trilhas/Basico";
import Login from "../screens/initial";
import LoginPage from "../screens/login";
import Cadastro from "../screens/cadastro";
import Fetch from "../components/fetch/index"
import Home from "../screens/home";
import OnboardingItem from "../components/Onboarding/index";
import PasswordResets from "../utils/forgotPassword";
import Trilha from "../components/trilha";
import DeleteAccount from "../screens/deleteAccount";
import Configs from "../screens/configs";
import AccountConfig from "../screens/accountConfig"
import AlterPassword from "../screens/accountConfig/alterPassword"
import AlterEmail from "../screens/accountConfig/alterEmail"

import Preparo from "../components/preparo";
import Passos from "../components/passos";
import Parabens from "../components/parabens";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Profile"
        component={TabNavigatior}
        options={{ headerShown: false }}
      />
      {<Stack.Screen
        name="Fetch"
        component={Fetch}
        options={{ headerShown: false }}
      /> }
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Onboarding"
        component={OnboardingItem}
        />
      <Stack.Screen
        name="PasswordResets"
        component={PasswordResets}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Trilha"
        component={Trilha}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Configs"
        component={Configs}
        options={{ headerShown: true }}
      />
       <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{ headerShown: true }}
      />
       <Stack.Screen
        name="AccountConfig"
        component={AccountConfig}
        options={{ headerShown: true }}
      />
       <Stack.Screen
        name="AlterPassword"
        component={AlterPassword}
        options={{ headerShown: true }}
      />
       <Stack.Screen
        name="AlterEmail"
        component={AlterEmail}
        options={{ headerShown: true }}
      />
      
       <Stack.Screen
        name="Preparo"
        component={Preparo}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Passos"
        component={Passos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Parabens"
        component={Parabens}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    
  );
}

const Tab = createBottomTabNavigator();

export function TabNavigatior() {
  return(
   <Tab.Navigator>
    <Tab.Screen name = "Home" component={Home}  options={{headerShown: false, tabBarIcon: ({color, size})=>(
      <Ionicons name="home" size={24} color="black" />
    )}}/>
    <Tab.Screen name = "Perfil" component={Profile} options={{headerShown: false, tabBarIcon: ({color, size})=>(
      <Ionicons name="person-sharp" size={24} color="black" />
    )}}/>
    {/*<Tab.Screen name = "Trilhas" component={Fetch}options={{headerShown: false}}/>*/}
   </Tab.Navigator>
  )
}