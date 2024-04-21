import {SafeAreaView, View, Image, StyleSheet, Text,ScrollView,Button} from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AlbertoCustom } from '../../components/customalberto'

export function  Closet ({navigation}) {

    const [ItemAtualCabeça, setItemAtualCabeça] = useState()
    const [ItemAtualBoca, setItemAtualBoca] = useState()
    const [ItemAtualOlhos, setItemAtualOlhos] = useState()
    const [ItemAtualCorpo, setItemAtualCorpo] = useState()
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
    
            console.log(itens)
    
          }
        })
    
        return () => subscriver()

      }, [])

console.log(itens)


    return(

        <SafeAreaView>
    
            <View style={styles.placeholder}>
                 <AlbertoCustom itens={itens} itemAtualCabeça={ItemAtualCabeça} itemAtualOlhos={ItemAtualOlhos} itemAtualBoca={ItemAtualBoca}itemAtualCorpo={ItemAtualCorpo}/> 
                <ScrollView style={styles.butao}>
                    <Button onPress={() => setItemAtualCabeça(itens[0].Itens.indexOf('https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/alberto%2Falbertohead.png?alt=media&token=054df5b3-3e2c-47d8-9edf-de6fe8a5bd52')) }title = "Tirar chapeu"></Button>
                    <Button onPress={() => setItemAtualCabeça(itens[0].Itens.indexOf('https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/alberto%2Fcustom-parts%2Fhead%2Falberto.ClassicHat.png?alt=media&token=cfa43ad3-4717-4f98-b05d-0493c85da229')) }title = "chapeu"></Button>
                    <Button onPress={() => setItemAtualBoca(itens[0].Itens.indexOf('https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/alberto%2Fcustom-parts%2Fmouth%2FalbertoMustache.png?alt=media&token=1e61cd6a-605c-4a19-a97b-36319faebc9e')) }title = "bigode"></Button>
                    <Button onPress={() => setItemAtualBoca(itens[0].Itens.indexOf('https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/alberto%2Fcustom-parts%2Fmouth%2FalbertoSmile.png?alt=media&token=e4546605-1246-4563-bf04-54f64fb563f4')) }title = "sorriso"></Button>
                </ScrollView> 
            </View>
            
        </SafeAreaView>    
    )
    
}

export default Store

const styles = StyleSheet.create({

    placeholder:{
        top: -100

    },
})