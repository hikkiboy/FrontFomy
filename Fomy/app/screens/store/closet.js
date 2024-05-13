import {SafeAreaView, View, Image, StyleSheet, Text,ScrollView,Button,FlatList} from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId,doc,getDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AlbertoCustom } from '../../components/customalberto'

export default function Closet (){

    const [ItemAtualCabeça, setItemAtualCabeça] = useState()
    const [ItemAtualBoca, setItemAtualBoca] = useState()
    const [ItemAtualOlhos, setItemAtualOlhos] = useState()
    const [ItemAtualCorpo, setItemAtualCorpo] = useState()
    const [img,setImg] = useState()
    const [itens, setItens] = useState()


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
            setItens(receitas)
            setItemAtualCabeça(0)
            setItemAtualBoca(2)
            setItemAtualOlhos(3)
            setItemAtualCorpo(4)
    
            //console.log(itens)
    
          }
        })
    
        return () => subscriver()

      }, [])

      

//console.log(itens)
 

    return(

        <SafeAreaView>
{    
            <View style={styles.placeholder}>
                 {/* <AlbertoCustom itens={itens} itemAtualCabeça={ItemAtualCabeça} itemAtualOlhos={ItemAtualOlhos} itemAtualBoca={ItemAtualBoca}itemAtualCorpo={ItemAtualCorpo}/>  */}
 
                <FlatList
                data={itens}
                scrollEnabled
                renderItem={({item}) => (
                  <SafeAreaView>
                    <View>
                    <Button title='oi' onPress={() => console.log(item.Itens)}> </Button>
                    </View>
                  </SafeAreaView>
  )}
  />

            </View> }
            
        </SafeAreaView>    
    )

}
async function porra(key){
  const DocRef =  doc(app_DB,"Itens",key)
  const DocSnap = await getDoc(DocRef)
  const funny =  DocSnap.data()
  setImg(porra("3"))
  return funny["Imagem"]
}
console.log(img["_j"])


const styles = StyleSheet.create({

    placeholder:{
        top: 50 
    },
    image:{
      width: 150,
      height: 150,
    }

})