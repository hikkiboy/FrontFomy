import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'

import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = ({navigation}) => {

    const [Receitas, setReceitas] = useState([]);

    useEffect(()=>{

        
    
        const receitaRef = collection(app_DB, 'Usuarios')
    
        const q = query(
            receitaRef,
            where(documentId(), '==', app_auth.currentUser.uid)
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const receitas = []
                
                snapshot.docs.forEach(doc =>{   
                    receitas.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setReceitas(receitas)


    
            }
        })
    
        return() => subscriver()
    
    },[])
    

    return (
        
        <View>

<FlatList
  data={Receitas}
  renderItem={({item}) => (
    <SafeAreaView>

        <Text>Nome: {item.Nome}</Text>
    </SafeAreaView>
  )}
  />        
            <SafeAreaView>
            <Button onPress={() =>{app_auth.signOut()}} title = "Sair"/>
            {/*<Button onPress={() => navigation.navigate('Fetch')} title = "Trilhas"/>*/}
            </SafeAreaView>
            

        </View>
    )
}

export default Profile