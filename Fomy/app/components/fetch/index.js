import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot } from '@firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'

const List = ({navigation}) =>{


    const [Receitas, setReceitas] = useState([]);

    

useEffect(()=>{
    const receitaRef = collection(app_DB, 'Trilhas')

    const subscriver = onSnapshot(receitaRef, {
        next : (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc =>{
                
                receitas.push({
                    key : doc.id,
                    ...doc.data()
                })
            })
            setReceitas(receitas)
          
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
        <Text allowFontScaling={false}>Trilha: {item.NomeTrilha}</Text>
        </TouchableOpacity>
        </SafeAreaView>
  )}
  />
)

}

    

export default List


