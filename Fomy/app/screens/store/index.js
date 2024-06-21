import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc, collection, query, where, onSnapshot, documentId, updateDoc, arrayUnion } from 'firebase/firestore'

export default function Store({ navigation }) {

  const [itens, setItens] = useState()
  const [user, setUser] = useState()
  const [buy, setBuy] = useState()
  const [userStuff, setUserStuff] = useState([])


  useEffect(() => {
    const receitaRef = collection(app_DB, 'Itens')

    const q = query(
      receitaRef,
      where('Valor', '>', 0)
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

        //console.log(itens)

      }
    })

    return () => subscriver();

  }, [])

  //função que cuida de dar update nas moedas e array de itens 
  async function UpdateArray(img, index) {
    if (buy == index) {
      setBuy()
      let moedas = user[0].Moedas
      let preco = itens[index].Valor
      let newMoedas = moedas - preco
      const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)

      console.log(!user[0].Itens.find((element) => element == img))


      if (moedas >= preco && !user[0].Itens.find((element) => element == img)) {
        console.log("hellooooo");
        await updateDoc(userRef, {
          Itens: arrayUnion(img),
          Moedas: newMoedas
        })
      }
      else {
        alert("Erro")
      }
    }
    else {
      setBuy(index)
    }
  }

  async function buyPremium() {
    if (!user[0].Premium) {
      const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)

      await updateDoc(userRef, {
        Premium: true
      }).then(() => {
        console.log("updatou")
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  useEffect(() => {

    try {
      const login = onAuthStateChanged(app_auth, (user) => {

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
            setUserStuff(receitas[0].Itens)

          }
        })

        return () => subscriver()

      })
      return () => login();

    } catch (error) {
      console.log(error);
    }


  }, [app_auth.currentUser])

  return (
    <SafeAreaView style={styles.container}>
      {user != undefined && user != null &&
        <ScrollView style={{ minWidth: "100%" }} >
          <View style={{ paddingHorizontal: 5, paddingTop: 5 }} >
            <View style={styles.bgimg}>
              <Image style={styles.booklet} source={require('../../assets/darkstorelet.png')} />
              <View style={styles.titlearea} >
                <Image style={{ width: 119, height: 144 }} source={require('../../assets/evenMoreRichAlberto.png')} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.trilhaTit}>Loja</Text>
                </View>
              </View>
            </View>
          </View>
          {!user[0].Premium &&
            <View style={{ paddingHorizontal: 5, paddingTop: 5 }} >
              <TouchableOpacity activeOpacity={0.8} style={styles.bgpremium} onPress={() => buyPremium()} >
                <View style={styles.premiumarea} >
                  {/* <Image style={{ width: 119, height: 144 }} source={require('../../assets/evenMoreRichAlberto.png')} /> */}
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.premiumTit}>Comprar Premium</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }


          <View style={styles.moneycontainer} >
            <View style={styles.moneyarea} >
              <FontAwesome6 name='piggy-bank' size={37} color={"#FFF"} />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={styles.monay} >{user != null && user[0].Moedas}</Text>
              </View>
            </View>
          </View>
          <View style={styles.itemlist} >
            <FlatList
              data={itens}
              numColumns={2}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.itemcontainer} >
                  <View style={styles.itemarea} >
                    <View style={styles.itemhoopjumper} />
                    <View style={styles.itemimagearea} >
                      <Image style={styles.itemimage} source={{ uri: item.Icone }} />
                    </View>
                    {userStuff.includes(item.key) ? (
                      <View style={styles.itemseebutton} >
                        <Text style={styles.itemprice} >Comprado</Text>
                      </View>
                    ) : (
                      <TouchableOpacity activeOpacity={0.8}
                        onPress={user[0].Moedas >= item.Valor ? (() => UpdateArray(item.key, index)) : (() => void (0))}
                        style={[styles.itemseebutton, { flexDirection: buy == index ? 'column' : 'row', justifyContent: buy == index ? 'center' : 'space-between' }]}
                      >
                        {buy == index ? (
                          <>
                            <Text style={styles.itemprice} >Comprar?</Text>
                          </>
                        ) : (
                          <>
                            {user[0].Moedas >= item.Valor ? (
                              <Image style={{ height: 40, width: 40 }} source={require('../../assets/coin-icon.png')} />
                            ) : (
                              <FontAwesome6 style={{ marginLeft: 2 }} name='lock' size={30} color={"#FFF"} />
                            )}
                            <Text style={styles.itemprice} >{item.Valor}</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              ItemSeparatorComponent={<View style={{ height: 20, width: 20 }} />}
            />
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bgimg: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 30,
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
    paddingStart: 45,
    paddingEnd: 45,
    marginVertical: 35,
    zIndex: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  trilhaTit: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFF",
    //fontFamily: FontFamily.leagueSpartanBold
  },
  moneycontainer: {
    width: "100%",
    marginBottom: 35
  },
  moneyarea: {
    backgroundColor: "#FAB151",
    borderColor: "#ED8A07",
    borderRadius: 20,
    borderWidth: 6,
    width: "55%",
    left: -40,
    paddingStart: 50,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  monay: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: 'bold'
  },
  itemlist: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "100%",
    flex: 1,
    marginBottom: 70
  },
  itemcontainer: {
    width: "100%",
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center'
  },
  itemarea: {
    alignItems: 'center',
    width: "95%",
    marginVertical: 10,
  },
  itemhoopjumper: {
    backgroundColor: '#FAB151',
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 6,
    borderBottomWidth: 9,
    borderColor: "#ED8A07"
  },
  itemimagearea: {
    borderRadius: 20,
    borderColor: "#ED8A07",
    backgroundColor: "#FFF",
    borderWidth: 6,
    paddingVertical: 20,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemimage: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  itemseebutton: {
    width: "100%",
    padding: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 9
  },
  itemprice: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: "#FFF",
  },
  bgpremium: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 45,
    backgroundColor: "#BC4246",
    borderColor: "#95233F",
    borderWidth: 8,
  },
  premiumTit: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  premiumarea: {
    width: '100%',
    paddingStart: 10,
    paddingEnd: 10,
    marginVertical: 15,
    zIndex: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

});