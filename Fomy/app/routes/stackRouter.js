import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Entypo } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import { View } from "react-native";
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
import Store from '../screens/store'
import Community from '../screens/community'
import Book from '../screens/book'

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
      <Stack.Screen
        name="Store"
        component={Store}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community"
        component={Community}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
    
  );
}

const Tab = createBottomTabNavigator();

export function TabNavigatior() {
  return(
   <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor: 'white',
        height: 70,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderTopWidth: 0,
        position: 'absolute'
      },
    }}
   >
    <Tab.Screen name = "Perfil" component={Profile} options={{
      headerShown: false,
      backgroundColor: 'red',
      tabBarIcon: ({focused})=>(
      <Ionicons name="person-sharp" size={34} color={focused ? "#7eb77f" : "black"} />
    )}}/>
    
    <Tab.Screen name = "Community" component={Community} options={{
      headerShown: false,
      tabBarIcon: ({focused})=>(
      <Ionicons name="chatbubble-ellipses-outline" size={34} color={focused ? "#7eb77f" : "black"} />
    )}}/>

    <Tab.Screen name = "Home" component={Home}  options={{
      headerShown: false,
      tabBarIcon: ({focused})=>(
      <Ionicons name="home" size={34} color={focused ? "#7eb77f" : "black"} />
    )}}/>
    
    <Tab.Screen name = "Store" component={Store} options={{
      headerShown: false,
      tabBarIcon: ({focused})=>(
      <Ionicons name="cart-outline" size={34} color={focused ? "#7eb77f" : "black"} />
    )}}/>
    
    <Tab.Screen name = "Book" component={Book} options={{
      headerShown: false,
      tabBarIcon: ({focused})=>(
      <FontAwesome name="book" size={34} color={focused ? "#7eb77f" : "black"} />
    )}}/>

    {/*<Tab.Screen name = "Trilhas" component={Fetch}options={{headerShown: false}}/>*/}
   </Tab.Navigator>
  )
}