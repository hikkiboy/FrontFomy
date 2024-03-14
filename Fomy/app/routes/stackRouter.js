import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from '@expo/vector-icons';
import { Platform } from "react-native";
import Profile from "../screens/profile";
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
import Loading from "../components/loading";
import Store from '../screens/store'
import Community from '../screens/community'

import Preparo from "../components/preparo";
import Passos from "../components/passos";
import Parabens from "../components/parabens";
import { Search } from "../screens/book/search";
import MainBook from "../screens/book/mainBook";
const Stack = createNativeStackNavigator();

export default function Routes({ loggedIn, loading }) {

  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = React.useState("Loading")

  React.useEffect(() => {
    if (loading == false) {
      if (loggedIn) {
        setInitialRoute("HomeStart")
        setTimeout(() => { navigation.navigate("HomeStart", { screen: "Home" }) }, 220)
      } else {
        navigation.navigate("Login")
        setInitialRoute("Login")
      }
    }
  }, [loggedIn, loading])
  return (
    <Stack.Navigator initialRouteName={initialRoute} backBehavior="initialRoute" >

      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      {<Stack.Screen
        name="Fetch"
        component={Fetch}
        options={{ headerShown: false }}
      />}
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
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="HomeStart"
        component={TabNavigatior}
        options={{ headerShown: false, gestureEnabled: false }}
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
        component={MainBook}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>

  );
}

const Tab = createBottomTabNavigator();

export function TabNavigatior() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: Platform.OS === 'ios' ? 100 : 70,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          borderTopWidth: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center'
        },
      }}
    >
      <Tab.Screen name="Perfil" component={Profile} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="person-sharp" size={32} color={focused ? "#2985DB" : "#505050"} />
        )
      }} />

      <Tab.Screen name="Community" component={Community} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="chatbubble-ellipses" size={32} color={focused ? "#2985DB" : "#505050"} />
        )
      }} />

      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="home" size={32} color={focused ? "#70d872" : "#505050"} />
        )
      }} />

      <Tab.Screen name="Store" component={Store} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="cart" size={32} color={focused ? "#ED8A07" : "#505050"} />
        )
      }} />

      <Tab.Screen name="Book" component={MainBook} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="book" size={32} color={focused ? "#be48d5" : "#505050"} />
        )
      }} />

      {/*<Tab.Screen name = "Trilhas" component={Fetch}options={{headerShown: false}}/>*/}
    </Tab.Navigator>
  )
}