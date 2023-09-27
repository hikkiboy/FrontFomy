import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot } from '@firebase/firestore'

const List = ({navigation}) =>{


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
    <View>
        <TouchableOpacity onPress={() => navigation.navigate(item.NomeTrilha)}>
        <Text>Trilha: {item.NomeTrilha}</Text>
        </TouchableOpacity>
    </View>
  )}
  />
)

}

    

export default List


