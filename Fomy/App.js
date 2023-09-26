import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {User, onAuthStateChanged} from 'firebase/auth'
import Login from './app/screens/login/index'
import Cadastro from './app/screens/cadastro/index';
import Home from './app/screens/home/index'
import Details from './app/screens/home/details'
import { useEffect, useState } from 'react';
import { app_auth } from './firebaseConfig';

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeLayout(){
  return (
      <HomeStack.Navigator >
        <HomeStack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <HomeStack.Screen name='Details' component={Details} options={{headerShown: false}}/>
      </HomeStack.Navigator>

  );
}



export default function App() {
  const [user, SetUser] = useState<User | null> (null);
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

