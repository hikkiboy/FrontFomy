import {SafeAreaView, View, Image, StyleSheet, Text,ScrollView,Button, FlatList, TouchableOpacity} from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, FieldValue,arrayUnion,updateDoc, doc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AlbertoCustom } from '../../components/customalberto'


export default function Store ({navigation}){

  const [itens, setItens] = useState()
  const [user,setUser] = useState()


    useEffect(() => {

        const receitaRef = collection(app_DB, 'Itens')
        
        const q = query(
          receitaRef,
          
        )
        const subscriver = onSnapshot(q, {
          next: (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc => {
              receitas.push({
                key: doc.id,
                ...doc.data(),
                
              })
            })
            setItens(receitas)
            
            console.log(itens)
            
          }
        })
        
        return () => subscriver()
        
      }, [])
      

      
      async function UpdateArray(img){
        const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)
        await updateDoc(userRef, {
          Itens: arrayUnion(img)
        })
      }

      useEffect(() => {

        const receitaRef = collection(app_DB, 'Usuarios')
    
        const q = query(
          receitaRef,
          where(documentId(), '==', app_auth.currentUser.uid),
    
        )
        const subscriver = onSnapshot(q, {
          next: (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc => {
              receitas.push({
                key: doc.id,
                ...doc.data(),
    
              })
            })
            setUser(receitas)
    
    
          }
        })
    
        return () => subscriver()
    
    
    
      }, [])


console.log(user)


    return(

        <SafeAreaView>
    
            <View style={styles.placeholder}>
            <FlatList
                data={itens}
                scrollEnabled
                renderItem={({item}) => (
                  <SafeAreaView>
                    <Button title= {item.NomeItem} onPress={() => UpdateArray(item.key)}></Button>
                    <Button title= "Closet" onPress={() => navigation.navigate('Closet')}></Button>
                    <View>
                    <Image style={styles.image} resizeMode='center' source={{uri: item.Imagem}}/>
                    </View>
                  </SafeAreaView>
  )}
  />
          
            </View>
            {/* <Text>Moedas: {user[0].Moedas}</Text> */}
            
        </SafeAreaView>    
    )
    
}




const styles = StyleSheet.create({

    placeholder:{

    },
    image:{
      width: 150,
      height: 150,
    }
})