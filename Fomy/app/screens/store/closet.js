import { View, Image, StyleSheet, Text, ScrollView, Button, FlatList, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, doc, updateDoc } from '@firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import AlbertoCustom from '../../components/customalberto'
import LazyList from '../../components/lazylist'

export default function Closet({ route }) {

  const [user, setUser] = useState()

  const [realDawg, setRealDawg] = useState([])


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
    try {
      const login = onAuthStateChanged(app_auth, () => {
        getUser();
      })

      return () => login();

    } catch (error) {
      console.log(error);
    }

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
    } else {
      setRealDawg([])
    }

  }
    , [user, app_auth.currentUser])

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
    <SafeAreaView style={styles.container}>
      {realDawg != null && realDawg.length != 0 ? (
        <ScrollView contentContainerStyle={{ minHeight: "100%", width: "100%" }} >
          <View style={styles.bgimg}>
            <Image tintColor={"#ED8A07"} style={styles.booklet} source={require('../../assets/booklet.png')} />
            <View style={styles.titlearea} >
              <Text style={styles.trilhaTit}>Armário</Text>
              <AlbertoCustom width={250} height={250} />
            </View>
          </View>
          <View style={styles.badgearea} >
            <Text style={styles.badgetitle} >Chapéus</Text>
            <View style={styles.badges} >
              <LazyList data={realDawg.filter((item) => item.Posição == 0)} update={porra} />
            </View>
          </View>
          <View style={styles.badgearea} >
            <Text style={styles.badgetitle} >Olhos</Text>
            <View style={styles.badges} >
              <LazyList data={realDawg.filter((item) => item.Posição == 1)} update={porra} />
            </View>
          </View>
          <View style={styles.badgearea} >
            <Text style={styles.badgetitle} >Boca</Text>
            <View style={styles.badges} >
              <LazyList data={realDawg.filter((item) => item.Posição == 2)} update={porra} />
            </View>
          </View>
          <View style={styles.badgearea} >
            <Text style={styles.badgetitle} >Corpo</Text>
            <View style={styles.badges} >
              <LazyList data={realDawg.filter((item) => item.Posição == 3)} update={porra} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator size={120} color={"#ED8A07"} />
          <Text style={{ marginTop: 15, fontSize: 20, textAlign: 'center', width: "90%" }} >Carregando...</Text>
        </View>
      )}



    </SafeAreaView>
  )

}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    display: 'flex',
    backgroundColor: "#FFF"
  },
  bgimg: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 45,
    backgroundColor: "#FAB151",
  },
  booklet: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch'
  },
  titlearea: {
    width: '100%',
    marginTop: 20,
    marginBottom: -50,
    zIndex: 98,
    justifyContent: 'center',
    alignItems: 'center',

  },
  trilhaTit: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFF",
    //fontFamily: FontFamily.leagueSpartanBold
  },
  badgearea: {
    backgroundColor: "#EFEFEF",
    width: '100%',
    borderRadius: 20,
    padding: 15,
    paddingBottom: 18,
    paddingTop: 12,
    marginBottom: 70,
    backgroundColor: "#FAB151",
    borderColor: "#ED8A07",
    borderWidth: 7,
    borderBottomWidth: 10

  },
  badgetitle: {
    fontWeight: 'bold',
    fontSize: 27,
    color: "#FFF",
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',

  },
  badges: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 12
  },

});