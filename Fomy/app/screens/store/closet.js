import {View, Image, StyleSheet, Text,ScrollView,Button,FlatList, Touchable, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId,doc,getDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import AlbertoCustom  from '../../components/customalberto'

export default function Closet ({route}){

    const [ItemAtualCabeça, setItemAtualCabeça] = useState()
    const [ItemAtualBoca, setItemAtualBoca] = useState()
    const [ItemAtualOlhos, setItemAtualOlhos] = useState()
    const [ItemAtualCorpo, setItemAtualCorpo] = useState()
    const [user, setUser] = useState()

    const [realDawg, setRealDawg] = useState()


    //console.log(route.params.user[0])

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

    useEffect(()=>{

      if(route.params.user[0] != "" ){
        
      const itensRef = collection(app_DB, 'Itens')

     
  
      const q = query(
          itensRef,
          where(documentId(), 'in', route.params.user[0])
      )
  
      
  
      const subscriver = onSnapshot(q, {
          next : (snapshot) => {
              const insignias = []
              
              snapshot.docs.forEach(doc =>{   
                  insignias.push({
                      key : doc.id,
                      ...doc.data(),
                     
                  })
              })
              setRealDawg(insignias)
              console.log(realDawg)

  
          }
      })
  
      return() => subscriver()
  }
  
  }
  ,[])

//console.log(itens)
async function porra(url, position){
  let gamer = user[0].ItensAli
  console.log(gamer);
  gamer[position] = url
  console.log(gamer);
}
 

    return(
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 
                <FlatList
                data={realDawg}
                scrollEnabled
                numColumns={2}
                renderItem={({item}) => (
                  <SafeAreaView>
                    <View>
                    <TouchableOpacity onPress={() => porra(item.Imagem, item.Posição)}>
                      <Image style={{height: 150, width: 100, resizeMode: 'contain'}} source={{uri: item.Imagem}}></Image>
                    </TouchableOpacity>
                    </View>
                  </SafeAreaView>
  )}
  />
            
            
        </SafeAreaView>    
    )

}



const styles = StyleSheet.create({

    placeholder:{
        flex: 1
    },
    image:{
      width: 150,
      height: 150,
    }

})