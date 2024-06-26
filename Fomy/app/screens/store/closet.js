import { View, Image, StyleSheet, Text, ScrollView, Button, FlatList, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, doc, updateDoc } from '@firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import AlbertoCustom from '../../components/customalberto'
import LazyList from '../../components/lazylist'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function Closet({ route }) {

  const [user, setUser] = useState()

  const [realDawg, setRealDawg] = useState([])

  const [finished, setFinished] = useState(false)


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
    try {
      if (user != null && user[0].Itens.length > 0) {

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
            setFinished(true)

          }
        })

        return () => subscriver()
      } else if (user != null && user[0].Itens.length === 0) {
        setRealDawg([])
        setFinished(true)
      } else {
        setRealDawg([])
      }
    } catch (error) {
      console.log(error);
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
          <View style={{ paddingHorizontal: 5, paddingTop: 5 }} >
            <View style={styles.bgimg}>
              <Image tintColor={"#ED8A07"} style={styles.booklet} source={require('../../assets/booklet.png')} />
              <View style={styles.titlearea} >
                <View style={{ flex: 1 }} >
                  <Text allowFontScaling={false} style={styles.trilhaTit}>Roupas</Text>
                </View>
                <AlbertoCustom width={144} height={144} />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10 }} >
            {realDawg.filter((item) => item.Posição == 0).length > 0 &&
              <View style={{ width: "100%", alignItems: 'center' }} >

                <View style={{ width: "100%" }} >
                  <View style={{ backgroundColor: "#FAB151", borderRadius: 15, paddingVertical: 6, borderWidth: 6, borderBottomWidth: 9, borderColor: "#ED8A07" }} >
                    <Text allowFontScaling={false} style={styles.badgetitle} >Chapéus</Text>
                  </View>
                </View>
                <View style={styles.badgearea} >
                  <View style={styles.badges} >
                    <LazyList data={realDawg.filter((item) => item.Posição == 0)} update={porra} />
                  </View>
                </View>
              </View>
            }
            {realDawg.filter((item) => item.Posição == 1).length > 0 &&
              <View style={{ width: "100%", alignItems: 'center' }} >
                <View style={{ width: "100%" }} >
                  <View style={{ backgroundColor: "#FAB151", borderRadius: 15, paddingVertical: 6, borderWidth: 6, borderBottomWidth: 9, borderColor: "#ED8A07" }} >
                    <Text allowFontScaling={false} style={styles.badgetitle} >Olhos</Text>
                  </View>
                </View>
                <View style={styles.badgearea} >
                  <View style={styles.badges} >
                    <LazyList data={realDawg.filter((item) => item.Posição == 1)} update={porra} />
                  </View>
                </View>
              </View>
            }
            {realDawg.filter((item) => item.Posição == 2).length > 0 &&
              <View style={{ width: "100%", alignItems: 'center' }} >
                <View style={{ width: "100%"}} >
                  <View style={{ backgroundColor: "#FAB151", borderRadius: 15, paddingVertical: 6, borderWidth: 6, borderBottomWidth: 9, borderColor: "#ED8A07" }} >
                    <Text allowFontScaling={false} style={styles.badgetitle} >Boca</Text>
                  </View>
                </View>
                <View style={styles.badgearea} >
                  <View style={styles.badges} >
                    <LazyList data={realDawg.filter((item) => item.Posição == 2)} update={porra} />
                  </View>
                </View>
              </View>
            }
            {realDawg.filter((item) => item.Posição == 3).length > 0 &&
              <View style={{ width: "100%", alignItems: 'center' }} >
                <View style={{ width: "100%"}} >
                  <View style={{ backgroundColor: "#FAB151", borderRadius: 15, paddingVertical: 6, borderWidth: 6, borderBottomWidth: 9, borderColor: "#ED8A07" }} >
                    <Text allowFontScaling={false} style={styles.badgetitle} >Corpo</Text>
                  </View>
                </View>
                <View style={[styles.badgearea, { marginBottom: 80 }]} >
                  <View style={styles.badges} >
                    <LazyList data={realDawg.filter((item) => item.Posição == 3)} update={porra} />
                  </View>
                </View>
              </View>
            }
          </View>
        </ScrollView>
      ) : finished ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <FontAwesome5 color="#505050" name="wind" size={175} />
          <Text allowFontScaling={false} style={[styles.nothingtxt, { marginTop: 20 }]} >Seu Armário está vazio...</Text>
          <Text allowFontScaling={false} style={[styles.nothingtxt, { fontSize: 23, marginTop: 50, fontFamily: "FredokaMedium" }]} >Compre uma roupa para colocar no Alberto!</Text>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator size={120} color={"#ED8A07"} />
          <Text allowFontScaling={false} style={{ marginTop: 15, fontSize: 22, fontFamily: "FredokaSemibold", textAlign: 'center', width: "90%" }} >Carregando...</Text>
        </View>
      )}



    </SafeAreaView >
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
    paddingStart: 30,
    paddingEnd: 30,
    marginVertical: 35,
    zIndex: 98,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  trilhaTit: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 42,
    fontFamily: "FredokaSemibold",
    color: "#FFF",
    //fontFamily: FontFamily.leagueSpartanBold
  },
  badgearea: {
    backgroundColor: "#FFF",
    width: '100%',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 70,
    borderColor: "#E9E9E9",
    borderWidth: 6,
    borderBottomWidth: 9,

  },
  badgetitle: {
    fontFamily: "FredokaSemibold",
    fontSize: 26,
    color: "#FFF",
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',

  },
  badges: {
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  nothingtxt: {
    fontFamily: "FredokaSemibold",
    width: "85%",
    textAlign: "center",
    fontSize: 26,
    color: "#505050"
    //marginTop: 35
  },
});