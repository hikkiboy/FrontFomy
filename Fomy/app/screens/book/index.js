import {SafeAreaView, View, Image, StyleSheet, Text,FlatList,TouchableOpacity, TextInput} from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { useState, useEffect } from 'react'
import { search } from './search'
import { Feather } from 'react-native-vector-icons'
import { FontAwesome5 } from 'react-native-vector-icons'
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";

//ASLKDMASFMALGMLGSA

const Book = ({navigation}) => {

    const [user, setUser] = useState({})
    const [search, setSearch] = useState("");
    const [listing, setListing] = useState([])
    const [trilha, setTrilha] = useState ({})
    const [whyReact, setWhyReact] = useState([])
    let colorArray = []

    function colorThis(){
        listing.forEach((item) => {
            if(item.NomeTrilha == "Básico"){
                colorArray.push(0)
                
            } else if(item.NomeTrilha == "Refeições"){
                colorArray.push(1)
                
            } else if(item.NomeTrilha == "Doces"){
                colorArray.push(2)
               
            } else if(item.NomeTrilha == "Gourmet"){
                colorArray.push(3)
               
            }
        })
        setWhyReact(colorArray)

    }

    useEffect(() => {

        const userRef = collection(app_DB, 'Usuarios')
    
        const q = query(
            userRef,
            where(documentId(), '==', app_auth.currentUser.uid)
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const userq = []
                
                snapshot.docs.forEach(doc =>{
                    userq.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setUser(userq[0])
            
            }
        })

          return () => subscriver()

    },[])

    useEffect(() => {

        const trilhaRef = collection(app_DB, 'Trilhas')
    
        const q = query(
            trilhaRef,
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const trilhaq = []
                
                snapshot.docs.forEach(doc =>{
                    trilhaq.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setTrilha(trilhaq)

            
            }
        })

          return () => subscriver()

    },[])

    useEffect(() => {

        //var cart = user.Cart

        if(user.ReceitasFeitas != undefined || user.ReceitasFeitas != {} || user.ReceitasFeitas != "" || user.ReceitasFeitas != null || user.Cart.ReceitasFeitas == 0){
            try {
                const listingRef = collection(app_DB, 'Receitas')

                const q = query(
                    listingRef,
                    where(documentId(), 'in', user.ReceitasFeitas)
                )

                const subscriver = onSnapshot(q, {
                    next : (snapshot) => {
                    const listingq = []
                    snapshot.docs.forEach(doc =>{
                        listingq.push({
                        key : doc.id,
                        ...doc.data(),
                        
                        })
                    })
                    setListing(listingq)

                    }
                })

                return () => subscriver()
        } catch(error){
            
        }
        }

    },[user])

    useEffect(() => {
        if( listing.length != 0 && user.ReceitasFeitas != undefined || user.ReceitasFeitas != {} || user.ReceitasFeitas != "" || user.ReceitasFeitas != null || user.Cart.ReceitasFeitas == 0){
            try{colorThis()} catch(error){console.log(error)}
        }
    },[listing, user])
    const handleSearch = () => {
        if(search != ""){
          navigation.navigate("Search", {paramKey:[search, listing]})
        }
      }
        
    return(
        
        <SafeAreaView style={styles.itemlist} >
            <View style={styles.searcharea} >
                <TextInput onSubmitEditing={() => handleSearch()} value= {search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
                    <TouchableOpacity onPress={() => handleSearch()} style={styles.searchbutton} >
                    <Feather name="search" style={styles.searchicon} size={25} color={"rgba(0,0,0,0.75)"} />
                </TouchableOpacity>
            </View>

            {listing.length != 0 && whyReact.length != 0 ? (
                <View style={styles.itemlist} >
                    <FlatList
                        data={listing}
                        extraData={whyReact}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={styles.itemcontainer} >
                                <TouchableOpacity onPress={() => navigation.navigate('Preparo',{paramKey:[item.Nome, trilha[whyReact[index]].Cor, item.Icone, trilha[whyReact[index]].CorBorda, trilha[whyReact[index]].CorFill]})}>
                                    <View style={styles.itemarea} >
                                        <View style={styles.itemarea} >
                                        <View style = {styles.imagecontain}>
                                            <Image style={styles.itemimage} source={{ uri : item.Icone }} />
                                            </View>
                                            <View style={styles.itemdetails} >
                                                <Text style={styles.itemtitle} >{item.Nome}</Text>
                                                
                                            </View>
                                            
                                        </View>
                                        
                                    </View>
                                    </TouchableOpacity>
                            </View>
                            
                        )}
                    />
                    <View style={styles.bottom} >
                        {/* <TouchableOpacity onPress={() => Buy()} style={styles.buybutton}>
                            <Text style={styles.buytxt} >Comprar</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backbutton}>
                            <Text style={styles.buytxt} >Voltar</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
        
            ) : (
                <View style={styles.nothing} >
                    <FontAwesome5 name="book" size={175} />
                    <Text style={styles.nothingtxt} >Seu livro está vazio...</Text>
                    <Text style={[styles.nothingtxt, {fontSize: 23, marginTop: 70}]} >Faça uma receita para acessa-la facilmente aqui!</Text>
                </View>
            )}
        </SafeAreaView>
    )

    
}

export default Book

const styles = StyleSheet.create({
    itemlist:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 15,
    },
    itemcontainer:{
        borderWidth: 10,
        backgroundColor: '#FFF', 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        borderColor: '#62BC63'
    },
    itemarea:{
        alignItems: 'center',
        width: "95%",
        marginHorizontal: -94,
        //marginVertical: 5,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    imagecontain:{
        height: 100,
        width: 150,
        borderRadius: 10,
        backgroundColor: '#70D872',
        borderColor: "#62BC63",
        //borderRadius: 10,
        borderWidth: 10
    },
    itemimage:{
        height: 100,
        width: 100,
        alignSelf: 'center'
       
    },
    itemdetails:{
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15
    },
    itemtitle:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
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
    bottom:{
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        paddingBottom: 20,
        backgroundColor: "#F9F9F9",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    buybutton:{
        backgroundColor: "#E06E8B",
        padding: 5,
        width: "90%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 5
    },
    backbutton:{
        backgroundColor: "#38BA9B",
        padding: 5,
        width: "90%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 20,
        //marginBottom: 5
    },
    buytxt:{
        fontSize: 22,
        color: "#FFF",
        fontWeight: "bold"
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
    gobackbutton:{
        //marginTop: "20%",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
    },
    gobacktxt:{
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        fontSize: 19,
        backgroundColor: "#E06E8B",
        color: "#FFF",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25
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
})