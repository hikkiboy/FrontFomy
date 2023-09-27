import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {User, onAuthStateChanged} from 'firebase/auth'
import Login from './app/screens/initial';
import Cadastro from './app/screens/cadastro/index';
import Home from './app/screens/home/index'
import { useEffect, useState } from 'react';
import { app_auth } from './firebaseConfig';
import Fetch from './app/components/fetch/index';
import LoginPage from './app/screens/login/index';

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeLayout(){
  return (
      <HomeStack.Navigator >
        <HomeStack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <HomeStack.Screen name='Fetch' component={Fetch} options={{headerShown: false}}/>
      </HomeStack.Navigator>

  );
}



export default function App() {
  const [user, SetUser] = useState()

  useEffect(() => { 
    onAuthStateChanged(app_auth, (user) => {
      SetUser(user)
    })
  }, [])
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name = 'logou' component={HomeLayout}/>
        ) : (<Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>) }
        
        <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}}/>
        <Stack.Screen name='Loginpage' component={LoginPage} options={{headerShown: false}}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

