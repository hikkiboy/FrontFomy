import { View, Image, StyleSheet, Text, ScrollView, Button, FlatList, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, doc, updateDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import AlbertoCustom from '../../components/customalberto'

export default function Closet({ route }) {

  const [user, setUser] = useState()

  const [realDawg, setRealDawg] = useState()


  //console.log(route.params.user[0])

  function getUser() {
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
  }

  useEffect(() => {

    getUser();


  }, [])

  useEffect(() => {
    if (user != null) {

      const itensRef = collection(app_DB, 'Itens')



      const q = query(
        itensRef,
        where(documentId(), 'in', user[0].Itens)
      )



      const subscriver = onSnapshot(q, {
        next: (snapshot) => {
          const insignias = []

          snapshot.docs.forEach(doc => {
            insignias.push({
              key: doc.id,
              ...doc.data(),

            })
          })
          setRealDawg(insignias)
          console.log(realDawg)


        }
      })

      return () => subscriver()
    }

  }
    , [user])

  //console.log(itens)

  //função que captura o array do banco de dados edita e devolve pro banco
  async function porra(url, position) {
    let gamer = user[0].ItensAli
    console.log(position);
    gamer[position] = url
    const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
    await updateDoc(userRef, {
      ItensAli: gamer,
    });
  }


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {realDawg != null ? (
        <>
          <AlbertoCustom />
          <FlatList
            data={realDawg}
            scrollEnabled
            numColumns={2}
            renderItem={({ item }) => (
              <SafeAreaView>
                <View>
                  <TouchableOpacity onPress={() => porra(item.Imagem, item.Posição)}>
                    <Image style={{ height: 150, width: 100, resizeMode: 'contain' }} source={{ uri: item.Imagem }}></Image>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            )}
          />
        </>
      ) : (
        <>
          <ActivityIndicator size={120} color={"#3B98EF"} />
          <Text style={{ marginTop: 15, fontSize: 20, textAlign: 'center', width: "90%" }} >Carregando...</Text>
        </>
      )}



    </SafeAreaView>
  )

}



const styles = StyleSheet.create({

  placeholder: {
    flex: 1
  },
  image: {
    width: 150,
    height: 150,
  }

})