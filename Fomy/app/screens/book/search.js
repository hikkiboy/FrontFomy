import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
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

    const done = route.params.paramKey[1]
    const arei = Object.values(done).map((item) => item.Nome);
    
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
            <View style={styles.filterarea} >
              <TouchableOpacity activeOpacity={0.8} style={styles.filterbutton} >
                <Text style={styles.filtertext} >Filtros</Text>
                <Feather style={styles.filtericon} name="filter" color={"#FFF"} size={25} />
              </TouchableOpacity>
            </View>
            <View style={[styles.items, { borderRadius: 25 }]} >
                <Text style={styles.itemstxt} >Resultados</Text>
                  <View style={styles.itemlist} >
            {listings.length != 0 && notFound == false ? (
                    <FlatList
                      data={listings}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <View style={styles.itemcontainer} >
                                <View style={styles.itemarea} >
                                    <View style={styles.itemarea} >
                                        <Image style={styles.itemimage} source={{ uri : item.Icone }} />
                                        <Text style={styles.itemtitle} >{item.Nome}</Text>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Details", { paramKey:[item.key] })} style={styles.itemseebutton} >
                                            <Text style={styles.itemseetxt} >Ver Anúncio</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
            
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 60,
    color: "#000"

  },
  searchicon:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 35
  },
  filterarea:{
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 35,
    width: "100%",
    paddingStart: 20,
    paddingEnd: 20
  },
  filterbutton:{
    width: "100%",
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,

  },
  filtertext:{
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18
  },
  filtericon:{
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 20

  },
  items:{
    marginTop: 0,
    backgroundColor: "#E06E8B",
    flex: 1,
    width: "100%",
    borderRadius: 25,
    alignItems: 'center',
  },
  itemstxt:{
    marginVertical: 5,
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  itemlist:{
    backgroundColor: "#FFF", 
    borderRadius: 25, 
    width: "100%", 
    flex: 1,
    paddingTop: 15
},
itemcontainer:{
    backgroundColor: "#F9F9F9", 
    borderRadius: 25, 
    width: "100%", 
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 20,
    alignItems: 'center'
},
itemarea:{
    alignItems: 'center',
    width: "95%",
    marginVertical: 10,
},
itemimage:{
    height: 155,
    width: 155,
    borderRadius: 10,
    marginBottom: 20
},
itemtitle:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    width: "100%",
    minHeight: 40
},
itemprice:{
    padding: 5,
    width: "100%",
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: "#E06E8B",
    color: "#FFF",
    borderRadius: 25,
},
itemseebutton:{
    width: "100%",
    marginTop: 11,
},
itemseetxt:{
    padding: 7,
    width: "100%",
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: "#38BA9B",
    color: "#FFF",
    borderRadius: 25

},
nothing:{
  marginTop: 70,
  flex: 1,
  width: "100%",
  borderRadius: 25,
  alignItems: 'center',
},
nothingtxt:{
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 50
},

});