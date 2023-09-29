import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { app, app_DB } from '../../../../firebaseConfig'
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'

const Doces = ({navigation}) =>{


    const [Receitas, setReceitas] = useState([]);

    

useEffect(()=>{
    
    const receitaRef = collection(app_DB, 'Receitas')

    const q = query(
        receitaRef,
        where('NomeTrilha', '==', 'Doces')
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


return(
  <FlatList
  data={Receitas}
  renderItem={({item}) => (
    <SafeAreaView>
        <Text>Receita: {item.Nome}</Text>
        </SafeAreaView>
  )}
  />
)

}

    

export default Doces


