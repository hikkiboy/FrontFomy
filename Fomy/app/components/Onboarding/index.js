import { View, Text, Image, useWindowDimensions, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useState, useEffect } from 'react';

export default Onboarding = ({item}) => {

    
 

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

    const {width} = useWindowDimensions();
  return (
     <FlatList
  data={Receitas}
  renderItem={({item}) => (
    <SafeAreaView>
        <Text>Trilha: {item.NomeTrilha}</Text>
        </SafeAreaView>
  )}
  />
  )
}


