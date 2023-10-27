import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser' 
import{
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,

} from 'firebase/auth'
import { app_auth } from '../../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleLog(){
    
    const [userInfo, setUserInfo] = useState()
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '27576730639-3u8tl40g33u9rjhh4ollpnpbacl1c756.apps.googleusercontent.com'
    })

    useEffect(() => {
        if(response?.type=='success') {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(app_auth, credential)
        }
    }, [response])


    return(
        promptAsync()
    )
}