import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'

import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({navigation}) => {

 

    const [Receitas, setReceitas] = useState([]);

    

useEffect(()=>{
    const receitaRef = collection(app_DB, 'Trilhas')

    const subscriver = onSnapshot(receitaRef, {
        next : (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc =>{
                console.log(doc.data())
                receitas.push({
                    key : doc.id,
                    ...doc.data()
                })
            })
            setReceitas(receitas)
            console.log(receitas)
            console.log(Receitas)

        }
    })

    return() => subscriver()

},[])


return(
  <FlatList
  data={Receitas}
  renderItem={({item}) => (
    <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate(item.NomeTrilha)}>
        <Text>Trilha: {item.NomeTrilha}</Text>
        </TouchableOpacity>
        </SafeAreaView>
  )}
  />
)

}

    

export default Home