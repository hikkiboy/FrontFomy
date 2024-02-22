import {SafeAreaView, View, Image, StyleSheet, Text,FlatList,TouchableOpacity} from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { useState, useEffect } from 'react'
import { Feather } from 'react-native-vector-icons'
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId } from "firebase/firestore";

const Book = ({navigation}) => {

    const [user, setUser] = useState({})
    const [listing, setListing] = useState([])
    const [trilha, setTrilha] = useState ({})
    const [whyReact, setWhyReact] = useState()

    //const [removed, setRemoved] = useState(0)
    console.log(app_auth.currentUser.uid)
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
                console.log(user)
                console.log(listing)
            
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
                console.log(trilha)

            
            }
        })

          return () => subscriver()

    },[])

    useEffect(() => {

        //var cart = user.Cart

        if(user.ReceitasFeitas != undefined || user.ReceitasFeitas != {} || user.ReceitasFeitas != "" || user.ReceitasFeitas != null || user.Cart.ReceitasFeitas == 0){
            try {
                const listingRef = collection(app_DB, 'Receitas')
                let colorArray = []

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
                    console.log("------------LISTING------------")
                    console.log(listing)
                    console.log("----------LISTING------------")
                    listing.forEach((item) => {
                        if(item.NomeTrilha == "Básico"){
                            colorArray.push(0)
                            console.log("adicionou Básico")
                        } else if(item.NomeTrilha == "Refeições"){
                            colorArray.push(1)
                            console.log("adicionou Refeição")
                        } else if(item.NomeTrilha == "Doces"){
                            colorArray.push(2)
                            console.log("adicionou Doce")
                        } else if(item.NomeTrilha == "Gourmet"){
                            colorArray.push(3)
                            console.log("adicionou Gourmet")
                        }
                    })
                    setWhyReact(colorArray)
                    console.log("colorArrayyyyyy:", whyReact)
                    
            
                    
                    }
                })

                return () => subscriver()
        } catch(error){
            let interval = setInterval(() => {
                try{
                    setListing([])
                } catch(error){
                    
                }
            }, 400)
    
            return () => clearInterval( interval )
        }
        }

    },[user])

    return(

        <SafeAreaView style={styles.itemlist} >
        {listing.length != 0 ? (
        <View style={styles.itemlist} >
            <FlatList
                data={listing}
                extraData={whyReact}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={styles.itemcontainer} >
                        {console.log("colorArray againnn: ", whyReact)}
                        <TouchableOpacity onPress={() => navigation.navigate('Preparo',{paramKey:[item.Nome, trilha[whyReact[index]].Cor, item.Icone, trilha[whyReact[index]].CorBorda, trilha[whyReact[index]].CorFill]})}>
                            <View style={styles.itemarea} >
                                <View style={styles.itemarea} >
                                    <Image style={styles.itemimage} source={{ uri : item.Icone }} />
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
                <Feather name="shopping-cart" size={175} />
                <Text style={styles.nothingtxt} >Seu carrinho está vazio.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackbutton} >
                    <Text style={styles.gobacktxt} >Voltar</Text>
                </TouchableOpacity>
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
        paddingTop: 15
    },
    itemcontainer:{
        backgroundColor: "#F9F9F9", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    itemarea:{
        alignItems: 'center',
        width: "95%",
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    itemimage:{
        height: 155,
        width: 155,
        borderRadius: 10,
        marginBottom: 20
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
        marginTop: 5
    },
    backbutton:{
        backgroundColor: "#38BA9B",
        padding: 5,
        width: "90%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 5
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
        marginTop: 35
    },
    gobackbutton:{
        marginTop: "20%",
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
    }
})