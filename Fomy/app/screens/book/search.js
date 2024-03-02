import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from 'react-native-vector-icons'
import { useEffect, useState} from 'react'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, documentId, startAt, endAt, orderBy, and } from 'firebase/firestore'

export function Search({ navigation, route }) {
    const [search, setSearch] = useState(route.params.paramKey[0]);
    const [products, setProducts] = useState([])
    const [found, setFound] = useState([])
    const [listings, setListings] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [ notFound, setNotFound ] = useState(false)
    const [forReal, setForReal] = useState([]) 

    const done = route.params.recipes[0]
    const arei = Object.values(done).map((item) => item.Nome);
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
    
    useEffect(()=>{

        
        const productsRef = collection(app_DB, 'Receitas')

        const subscriver = onSnapshot(productsRef, {
            next : (snapshot) => {
              const productsq = []
              snapshot.docs.forEach(doc =>{
                productsq.push({
                  key : doc.id,
                  ...doc.data(),
                  
                })
              })
              setProducts(productsq)
              //console.log(productsq)
              const arrayName = Object.values(productsq).map((item) => item.Nome);
              const productsq2 = []
              arrayName.forEach((field) => {
                if(field.toUpperCase().match("/*"+ search.toUpperCase() +"/*")){
                    
                  productsq2.push(field)
                }
              })
              setFound(productsq2)
            }
          })

          return () => subscriver()
    
    },[search, loaded])
    useEffect(() =>{
        
        setForReal(found.filter(element => arei.includes(element)))
    },[found])
    
    useEffect(()=>{
      try{
        const listingsRef = collection(app_DB, 'Receitas')
    
        const q = query(
            listingsRef,
            where('Nome', 'in', forReal),

            
        )
        setNotFound(false)
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const productsq3 = []
                
                snapshot.docs.forEach(doc =>{
                    productsq3.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setListings(productsq3)
                //console.log(listings)
            
            }
        })

        return() => subscriver()
      } catch(error) {
        //console.log(error)
        //console.log(found)
        setListings([])
        setNotFound(true)
      }
  
  },[search, found, loaded])

    const handleSearch = () => {
      if(search != ""){
        navigation.navigate("Search", {paramKey:[search, arei]})
      }
    }

  return (
    <SafeAreaView  style={styles.container}>
            <View style={styles.searcharea} >
                <TextInput onSubmitEditing={() => handleSearch()} value= {search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
                <Feather name="search" style={styles.searchicon} size={25} color={"rgba(0,0,0,0.75)"} />
            </View>

            <ScrollView contentContainerStyle={[styles.items, { borderRadius: 25 }]} >
                <Text style={styles.itemstxt} >Resultados</Text>
                  <View style={styles.itemlist} >
            {listings.length != 0 && notFound == false ? (
                    <FlatList
                      data={listings}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <View style={styles.itemcontainer} >
                                <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => navigation.navigate('Preparo',{paramKey:[item.Nome, trilha[whyReact[index]].Cor, item.Icone, trilha[whyReact[index]].CorBorda, trilha[whyReact[index]].CorFill]})}>
                                    <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: '#E9E9E9', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />
                                    <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: "#FFF", position: 'absolute', borderRadius: 20, borderColor: '#E9E9E9', borderWidth: 7 }]} />
                                    <View style={[{ height: '100%', width: 120, zIndex: 1, backgroundColor: '#70D872', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />
                
                                    <View style={styles.imagecontainer}>

                                        <Image  style={styles.icon} source={{ uri : item.Icone }}/>

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
                            </View>
                      )}
                    />
                
            ) : (
              <View style={styles.nothing} >
                <Text style={styles.nothingtxt} >Não conseguimos encontrar seu item...</Text>
                <Feather name="frown" size={150} color={"#rgba(0,0,0,0.3)"} />
              </View>
            )}
            </View>
            
            </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#FFF", 
    borderRadius: 25,
    width: "100%", 
    flex: 1,
},
items:{
  marginTop: 20,
  backgroundColor: "#70D872",
  minHeight: "100%",
  width: "100%",
  borderRadius: 25,
  alignItems: 'center',
},
itemstxt:{
  marginVertical: 5,
  color: "#FFF",
  fontSize: 22,
  fontWeight: 'bold',
  alignSelf: 'center'
},
itemlist:{
  backgroundColor: "#FFF", 
  borderRadius: 25, 
  width: "100%", 
  flex: 1,
  paddingTop: 30
},
bgimg:{
    width: "100%",
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: "#fff"
  },
  booklet:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch'
  },
  titlearea:{
    width: '100%',
    paddingStart: 40,
    paddingEnd: 40,
    marginVertical: 35,
    zIndex: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  trilhaTit:{
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 42,
    fontWeight: "bold",
    color: "#5DC15F",
    //fontFamily: FontFamily.leagueSpartanBold
  },
itemcontainer:{
    flex: 1,
    display: 'flex'
},

row:{
    flexDirection: 'row', 
    alignContent: 'flex-end', 
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 40,
    backgroundColor: '#FFF',
},
rightRow:{
  flex: 1,
  height: '100%',
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  backgroundColor:'#FFF',
  paddingVertical: 15,
  paddingStart: 15,
  paddingEnd: 15,
  borderWidth: 7,
  borderLeftWidth: 0,
  borderColor: "#E9E9E9"

},
descricaoFase:{
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    color: "#5DC15F"
},
timezone:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
},
timetxt:{
    fontSize: 17,
    marginLeft: 5,
    color: "#505050",
    fontWeight: "500"
},
imagecontainer:{
    borderColor: '#70D872',
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
icon:{
  width: 65,
  height: 65,
  alignSelf: 'center',
  paddingVertical: 20
},
searcharea:{
    width: "100%",
    borderColor: "#F2F2F2",
    borderBottomWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 20,
    paddingEnd: 20,
    paddingVertical: 15,

  },
  searchinput:{
    backgroundColor: "#F7F7F7",
    borderRadius: 25,
    fontSize: 20,
    width: "100%",
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 60,
    color: "#000"

  },
  searchbutton:{
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  searchicon:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 35
  },
  nothing:{
      backgroundColor: "#FFF", 
      borderRadius: 25, 
      width: "100%", 
      flex: 1,
      paddingTop: 15,
      justifyContent: "center",
      alignItems: "center"
  },
  nothingtxt:{
      fontWeight: "bold",
      width: "85%",
      textAlign: "center",
      fontSize: 25,
      //marginTop: 35
  },

});