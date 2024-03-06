import {View, Image, StyleSheet, Text,FlatList,TouchableOpacity, TextInput, LogBox, ScrollView} from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { search } from './search'
import { FontAwesome5, Feather, Octicons, FontAwesome } from 'react-native-vector-icons'
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId, orderBy } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';

//ASLKDMASFMALGMLGSA

const MainBook = ({navigation}) => {

    const [user, setUser] = useState({})
    const [search, setSearch] = useState("");
    const [listing, setListing] = useState([])
    const [trilha, setTrilha] = useState ({})
    const [whyReact, setWhyReact] = useState([])
    let colorArray = []

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);

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

        const login = onAuthStateChanged(app_auth, () => {
            try {
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
                    console.log("book usered: ", userq[0].Nome);
                }
            })

            return () => subscriver()
            } catch(error){
                console.log("stilldontcare");
            }
        })
        return () => login();

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
                console.log("help: ", trilha);

            
            }
        })

          return () => subscriver()

    },[])

    useEffect(() => {

        //var cart = user.Cart

        const login = onAuthStateChanged(app_auth, () => {
            try {
                if(user.ReceitasFeitas != undefined && user.ReceitasFeitas != {} && user.ReceitasFeitas != "" && user.ReceitasFeitas != null){
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
                            console.log("listed");

                            }
                        })

                        return () => subscriver()
                    } catch(error){
                        console.log(error);
                    }
                } else {
                    setListing({})
                    console.log("unlisted");
                }
            } catch(error){
                console.log("dontcare");
            }
        })
        return () => login()

    },[user])

    useEffect(() => {
        if(listing.length != 0 && user.ReceitasFeitas != undefined && user.ReceitasFeitas != {} && user.ReceitasFeitas != "" && user.ReceitasFeitas != null){
            try{colorThis(); console.log("colored");} catch(error){console.log(error)}
        }
    },[listing, user])

    const handleSearch = () => {
        if(search != ""){
          navigation.navigate("Search", {paramKey:[search], recipes:[listing], trilha:[trilha]})
        }
      }
        
    return(
        
        <SafeAreaView style={styles.container} >
            <View style={styles.searcharea} >
                <TextInput onSubmitEditing={() => handleSearch()} value= {search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
                    <TouchableOpacity onPress={() => handleSearch()} style={styles.searchbutton} >
                    <Feather name="search" style={styles.searchicon} size={25} color={"rgba(0,0,0,0.75)"} />
                </TouchableOpacity>
            </View>

            <View style={styles.bgimg}>
                <Image tintColor={"#70D872"} style={ styles.booklet } source={require('../../assets/booklet.png')} />
                <View style={ styles.titlearea } >
                    <Image  style={{width:108, height:139}} source={require('../../assets/betterAlberto.png')}/>
                    <View style={{flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.trilhaTit}>Livro de Receitas</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={trilha}
                extraData={whyReact}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={styles.buttonarea} >
                        <TouchableOpacity style={styles.button} >
                            {item.Imagem != "" && <Image style={styles.icon} source={{ uri : item.Imagem }} />} 
                            <Text style={styles.buttontitle} >{item.NomeTrilha}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.buttonarea} >
                <TouchableOpacity style={styles.button} >
                    <Image/>
                    <Text style={styles.buttontitle} >Favoritos</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )

    
}

export default MainBook

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFF", 
        borderRadius: 25,
        width: "100%", 
        flex: 1,
    },
    itemlist:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 20,
        marginBottom: 70
    },
    bgimg:{
        width: "100%",
        borderRadius: 20,
        marginTop: 20,
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
      buttonarea:{
        flex: 1,
        marginTop: 40
      },
      button:{

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
})