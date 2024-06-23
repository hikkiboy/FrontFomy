import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList, LogBox, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5, FontAwesome } from 'react-native-vector-icons'
import { useEffect, useState } from 'react'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc, collection, query, where, onSnapshot, documentId, startAt, endAt, orderBy, and } from 'firebase/firestore'

export function Search({ navigation, route }) {
  const [search, setSearch] = useState(route.params.paramKey[0]);
  const [products, setProducts] = useState([])
  const [found, setFound] = useState([])
  const [listings, setListings] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [forReal, setForReal] = useState([])
  const [whyReact, setWhyReact] = useState([])
  const [heheheyup, setHeheheyup] = useState(false)
  let colorArray = []

  const done = route.params.recipes[0]
  const arei = Object.values(done).map((item) => item.Nome);
  const trilha = route.params.trilha[0]
  const premium = route.params.premium[0]
  const userStuff = route.params.user[0]

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  function colorThis() {
    listings.forEach((item) => {
      if (item.NomeTrilha == "Básico") {
        colorArray.push(0)

      } else if (item.NomeTrilha == "Refeições") {
        colorArray.push(1)

      } else if (item.NomeTrilha == "Doces") {
        colorArray.push(2)

      } else if (item.NomeTrilha == "Gourmet") {
        colorArray.push(3)

      }
    })
    setWhyReact(colorArray)

  }

  useEffect(() => {


    const productsRef = collection(app_DB, 'Receitas')

    const subscriver = onSnapshot(productsRef, {
      next: (snapshot) => {
        const productsq = []
        snapshot.docs.forEach(doc => {
          productsq.push({
            key: doc.id,
            ...doc.data(),

          })
        })
        setProducts(productsq)
        //console.log(productsq)
        const arrayName = Object.values(productsq).map((item) => item.Nome);
        const productsq2 = []
        arrayName.forEach((field) => {
          if (field.toUpperCase().match("/*" + search.toUpperCase() + "/*")) {

            productsq2.push(field)
          }
        })
        setFound(productsq2)
      }
    })

    return () => subscriver()

  }, [search, loaded])
  useEffect(() => {
    setForReal(found.filter(element => arei.includes(element)))
    if(products != undefined && products.length != 0 && products[0].NomeTrilha != undefined){
      setHeheheyup(true)
    }
  }, [found])

  useEffect(() => {
    try {
      const listingsRef = collection(app_DB, 'Receitas')

      const q = query(
        listingsRef,
        where('Nome', 'in', forReal),


      )
      setNotFound(false)


      const subscriver = onSnapshot(q, {
        next: (snapshot) => {
          const productsq3 = []

          snapshot.docs.forEach(doc => {
            productsq3.push({
              key: doc.id,
              ...doc.data(),

            })
          })
          setListings(productsq3)
          //console.log(listings)

        }
      })

      return () => subscriver()
    } catch (error) {
      //console.log(error)
      //console.log(found)
      setListings([])
      try {
        if (products != undefined && products.length != 0 && products[0].NomeTrilha != undefined && heheheyup) {
          setNotFound(true)
        }
      } catch (error) {
        console.log(error);
       }
    }

  }, [search, found, loaded])

  useEffect(() => {
    if (listings.length != 0) {
      try { colorThis(); console.log("colored"); } catch (error) { console.log(error) }
    }
  }, [listings])

  const handleSearch = () => {
    if (search != "") {
      navigation.navigate("Search", { paramKey: [search], recipes: [done], trilha: [trilha], premium: [premium] })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searcharea} >
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} style={styles.backbutton} >
          <FontAwesome size={25} color={"#505050"} name='arrow-left' />
        </TouchableOpacity>
        <View style={styles.searchinputarea} >
          <TextInput onSubmitEditing={() => handleSearch()} value={search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
          <TouchableOpacity onPress={() => handleSearch()} activeOpacity={0.8} style={styles.searchicon} >
            <FontAwesome name="search" size={25} color={"#505050"} />
          </TouchableOpacity>
        </View>
      </View>

      {listings.length != 0 && whyReact.length != 0 && notFound == false ? (
        <ScrollView contentContainerStyle={styles.items} >

          <View style={styles.thisthing} >
            <View style={styles.whydoyoudothis} >
              <Text style={styles.itemstxt} >Resultados</Text>
            </View>
          </View>
          <View style={styles.itemlist} >
            <FlatList
              data={listings}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.itemcontainer} >
                  {premium == false && item.NomeTrilha == "Gourmet" ? (
                    <View />
                  ) : (
                    <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => navigation.navigate('Preparo', { paramKey: [item.Nome, trilha[whyReact[index]].Cor, item.Icone, trilha[whyReact[index]].CorBorda, trilha[whyReact[index]].CorFill], user: [userStuff], origin: ["Book"], description: [""] })}>
                      <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: '#E9E9E9', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />
                      <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: "#FFF", position: 'absolute', borderRadius: 20, borderColor: '#E9E9E9', borderWidth: 7 }]} />
                      <View style={[{ height: '100%', width: 120, zIndex: 1, backgroundColor: '#D383E3', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />

                      <View style={styles.imagecontainer}>

                        <Image style={styles.icon} source={{ uri: item.Icone }} />

                      </View>
                      <View style={[styles.rightRow]} >
                        <Text style={[styles.descricaoFase]}>{item.Nome}</Text>
                        {item.Tempo != null && item.Tempo != undefined && (
                          <View style={styles.timezone} >
                            <>
                              <FontAwesome5 name="clock" size={20} color={"#505050"} />
                              <Text style={styles.timetxt} >{item.Tempo} minutos</Text>
                            </>
                          </View>
                        )}
                      </View>

                    </TouchableOpacity>
                  )
                  }
                </View>
              )}
            />
          </View>
        </ScrollView>

      ) : (
        <View style={styles.nothing} >
          {notFound ? (
            <>
              <Text style={styles.nothingtxt} >Não conseguimos encontrar sua receita...</Text>
              <Feather name="frown" size={150} color={"#505050"} />
            </>
          ) : (
            <>
              <ActivityIndicator size={120} color={"#D383E3"} />
              <Text style={{ marginTop: 15, fontSize: 22, textAlign: 'center', width: "90%", fontFamily: "FredokaSemibold" }} >Procurando...</Text>
            </>
          )}
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "100%",
    flex: 1,
  },
  items: {
    marginTop: 30,
    minHeight: "100%",
    width: "100%",
    alignItems: 'center',
  },
  thisthing: {
    paddingHorizontal: 10,
    width: "100%",
  },
  whydoyoudothis: {
    backgroundColor: "#D383E3",
    paddingVertical: 10,
    borderColor: "#be48d5",
    borderWidth: 7,
    borderBottomWidth: 13,
    borderRadius: 20
  },
  itemstxt: {
    color: "#FFF",
    fontSize: 30,
    fontFamily: "FredokaSemibold",
    alignSelf: 'center'
  },
  itemlist: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "100%",
    flex: 1,
    paddingTop: 30
  },
  bgimg: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: "#fff"
  },
  booklet: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch'
  },
  titlearea: {
    width: '100%',
    paddingStart: 40,
    paddingEnd: 40,
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
    fontFamily: "FredokaSemibold",
    color: "#be48d5",
    //fontFamily: FontFamily.leagueSpartanBold
  },
  itemcontainer: {
    flex: 1,
    display: 'flex'
  },

  row: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 40,
    backgroundColor: '#FFF',
  },
  rightRow: {
    flex: 1,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingStart: 15,
    paddingEnd: 15,
    borderWidth: 7,
    borderLeftWidth: 0,
    borderColor: "#E9E9E9"

  },
  descricaoFase: {
    fontSize: 20,
    fontFamily: "FredokaSemibold",
    textAlign: 'center',
    width: '100%',
    color: "#be48d5"
  },
  timezone: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  timetxt: {
    fontSize: 18,
    marginLeft: 6,
    color: "#505050",
    fontFamily: "FredokaMedium"
  },
  imagecontainer: {
    borderColor: '#D383E3',
    backgroundColor: "#FFF",
    borderWidth: 7,
    width: 120,
    paddingVertical: 10,
    height: "100%",
    borderRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    zIndex: 3
  },
  icon: {
    width: 65,
    height: 65,
    alignSelf: 'center',
    paddingVertical: 20
  },
  searcharea: {
    width: "100%",
    borderColor: "#F2F2F2",
    borderBottomWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 10,
    paddingEnd: 10,
    paddingVertical: 15,
    flexDirection: 'row'

  },
  backbutton: {
    height: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginRight: 5,
    backgroundColor: "#F7F7F7",
    borderRadius: 50
  },
  searchinputarea: {
    backgroundColor: "#F7F7F7",
    borderRadius: 25,
    flex: 1,
    justifyContent: 'center'

  },
  searchinput: {
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 60,
    color: "#505050",
    fontFamily: "FredokaMedium"

  },
  searchicon: {
    position: 'absolute',
    paddingRight: 20,
    alignSelf: 'flex-end'
  },
  nothing: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  nothingtxt: {
    fontFamily: "FredokaSemibold",
    width: "85%",
    textAlign: "center",
    fontSize: 26,
    color: "#505050",
    marginBottom: 20,
  },

});