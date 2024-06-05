import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, LogBox, ScrollView, Modal, ActivityIndicator } from 'react-native'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { FontAwesome5, Feather, Octicons, FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons'
import { collection, deleteDoc, doc, query, where, onSnapshot, documentId, orderBy } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalBook } from '../../components/actionmodal/modalbook'

//ASLKDMASFMALGMLGSA

const MainBook = ({ navigation }) => {

    const [user, setUser] = useState({})
    const [search, setSearch] = useState("");
    const [listing, setListing] = useState([])
    const [trilha, setTrilha] = useState({})
    const [trilhaNumber, setTrilhaNumber] = useState([])
    const [terminated, setTerminated] = useState(false)
    const [whyReact, setWhyReact] = useState([])
    const [visible, setVisible] = useState(false)
    const [trilhaName, setTrilhaName] = useState("")

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    function colorThis() {
        let colorArray = []
        listing.forEach((item) => {
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

        let filter = listing.map(item => item.NomeTrilha)
            .filter((value, index, self) => self.indexOf(value) === index)

        colorArray = []
        trilha.forEach((item) => {
            if (filter.includes(item.NomeTrilha)) {
                if (item.NomeTrilha == "Gourmet" && user.Premium) {
                    colorArray.push(item)
                } else if (item.NomeTrilha != "Gourmet") {
                    colorArray.push(item)
                }
            }
        })
        setTrilhaNumber(colorArray)
        setTerminated(true);

    }

    useEffect(() => {
        try {
            const login = onAuthStateChanged(app_auth, (bah) => {
                const userRef = collection(app_DB, 'Usuarios')

                const q = query(
                    userRef,
                    where(documentId(), '==', app_auth.currentUser.uid)
                )



                const subscriver = onSnapshot(q, {
                    next: (snapshot) => {
                        const userq = []

                        snapshot.docs.forEach(doc => {
                            userq.push({
                                key: doc.id,
                                ...doc.data(),

                            })
                        })
                        setUser(userq[0])
                        console.log("book usered: ", userq[0].Nome);
                    }
                })

                return () => subscriver()
            })
            return () => login();

        } catch (error) {
            print(error)
        }
    }, [])

    useEffect(() => {

        const trilhaRef = collection(app_DB, 'Trilhas')

        const q = query(
            trilhaRef,
        )



        const subscriver = onSnapshot(q, {
            next: (snapshot) => {
                const trilhaq = []

                snapshot.docs.forEach(doc => {
                    trilhaq.push({
                        key: doc.id,
                        ...doc.data(),

                    })
                })
                setTrilha(trilhaq)


            }
        })

        return () => subscriver()

    }, [])

    useEffect(() => {

        //var cart = user.Cart

        try {
            const login = onAuthStateChanged(app_auth, () => {
                if (user.ReceitasFeitas != undefined && user.ReceitasFeitas != {} && user.ReceitasFeitas != "" && user.ReceitasFeitas != null) {
                    try {
                        const listingRef = collection(app_DB, 'Receitas')

                        const q = query(
                            listingRef,
                            where(documentId(), 'in', user.ReceitasFeitas)
                        )

                        const subscriver = onSnapshot(q, {
                            next: (snapshot) => {
                                const listingq = []
                                snapshot.docs.forEach(doc => {
                                    listingq.push({
                                        key: doc.id,
                                        ...doc.data(),

                                    })
                                })
                                setListing(listingq)


                            }
                        })

                        return () => subscriver()
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        if (user != {} && user != undefined && user != null && user.ReceitasFeitas != undefined) {
                            setTerminated(true)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    setListing([])
                    console.log("unlisted: ", app_auth.currentUser.email);
                }
            })
            return () => login()

        } catch (error) {
            print(error)
        }

    }, [user, app_auth.currentUser])

    useEffect(() => {
        if (listing.length != 0 && user.ReceitasFeitas != undefined && user.ReceitasFeitas != {} && user.ReceitasFeitas != "" && user.ReceitasFeitas != null) {
            try { colorThis(); } catch (error) { console.log(error) }
        }
    }, [listing, user])

    const handleSearch = () => {
        if (search != "") {
            navigation.navigate("Search", { paramKey: [search], recipes: [listing], trilha: [trilha], premium: [user.Premium], user: [user.ReceitasFeitas] })
        }
    }
    const handleModal = (name) => {
        setVisible(!visible)
        setTrilhaName(name)
    }

    return (

        <SafeAreaView style={styles.container} >
            {listing.length != 0 && whyReact.length != 0 ? (
                <>
                    <View style={styles.searcharea} >
                        <TextInput onSubmitEditing={() => handleSearch()} value={search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
                        <TouchableOpacity onPress={() => handleSearch()} style={styles.searchbutton} >
                            <FontAwesome name="search" style={styles.searchicon} size={25} color={"#505050"} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.itemlist} >
                        <View style={styles.bgimg}>
                            <Image tintColor={"#be48d5"} style={styles.booklet} source={require('../../assets/booklet.png')} />
                            <View style={styles.titlearea} >
                                <Image style={{ width: 119, height: 144 }} source={require('../../assets/dumbBookletAlberto.png')} />
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={styles.trilhaTit}>Livro de Receitas</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={trilhaNumber}
                            horizontal={true}
                            style={{ alignSelf: 'center' }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <View>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => handleModal(item.NomeTrilha)} style={[styles.button, { marginRight: index + 1 == trilhaNumber.length ? 10 : 25, marginLeft: index == 0 && 10 }]} >
                                        <MaterialCommunityIcons name={item.BookIcon} size={35} color={"#505050"} />
                                        <Text style={styles.buttontitle} >{item.NomeTrilha}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <FlatList
                            data={listing}
                            extraData={whyReact}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <View style={styles.itemcontainer} >
                                    {user != {} && user.Premium == false && item.NomeTrilha == "Gourmet" ?
                                        (
                                            <View />
                                        ) : (
                                            <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => navigation.navigate('Preparo', { paramKey: [item.Nome, trilha[whyReact[index]].Cor, item.Icone, trilha[whyReact[index]].CorBorda, trilha[whyReact[index]].CorFill], user: [user.ReceitasFeitas], origin: ["Book"], description: [""] })}>
                                                <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: '#E9E9E9', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />
                                                <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: "#FFF", position: 'absolute', borderRadius: 20, borderColor: '#E9E9E9', borderWidth: 7 }]} />
                                                <View style={[{ height: '100%', width: 120, zIndex: 1, backgroundColor: '#D383E3', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />

                                                <View style={[styles.imagecontainer, { borderColor: '#D383E3' }]}>

                                                    <Image style={styles.icon} source={{ uri: item.Icone }} />

                                                </View>
                                                <View style={[styles.rightRow]} >
                                                    <Text style={[styles.descricaoFase, { color: '#be48d5' }]}>{item.Nome}</Text>
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
                    </ScrollView>
                </>
            ) : (
                <View style={styles.nothing} >
                    {terminated ? (
                        <>
                            <FontAwesome5 color="#505050" name="book" size={175} />
                            <Text style={[styles.nothingtxt, { marginTop: 20 }]} >Seu livro está vazio...</Text>
                            <Text style={[styles.nothingtxt, { fontSize: 23, marginTop: 50 }]} >Faça uma receita para acessa-la facilmente aqui!</Text>
                        </>
                    ) : (
                        <>
                            <ActivityIndicator size={120} color={"#D383E3"} />
                            <Text style={{ marginTop: 15, fontSize: 20, textAlign: 'center', width: "90%" }} >Carregando...</Text>
                        </>
                    )}
                </View>
            )}
            <Modal visible={visible}
                onRequestClose={() => setVisible(false)}
                animationType="slide"
                presentationStyle='pageSheet'
            >
                <ModalBook
                    navigation={navigation}
                    fullListing={listing}
                    user={user}
                    fullTrilha={trilha}
                    name={trilhaName}
                    handleModal={handleModal}
                />

            </Modal>

        </SafeAreaView>
    )


}

export default MainBook

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        width: "100%",
        flex: 1,
    },
    itemlist: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        width: "100%",
        flex: 1,
        paddingTop: 20,
        marginBottom: 70
    },
    bgimg: {
        width: "100%",
        borderRadius: 20,
        marginBottom: 40,
        backgroundColor: "#D383E3",
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
        fontWeight: "bold",
        color: "#FFF",
        //fontFamily: FontFamily.leagueSpartanBold
    },
    button: {
        flex: 1,
        marginBottom: 40,
        marginRight: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#E9E9E9",
        borderRadius: 15,
        borderWidth: 4,
        borderBottomWidth: 8,
        paddingHorizontal: 17,
        paddingVertical: 7,
    },
    buttontitle: {
        color: "#505050",
        fontWeight: 'bold'
    },
    icon: {
        width: 65,
        height: 65,
        alignSelf: 'center',
        paddingVertical: 20
    },
    itemlist: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        width: "100%",
        flex: 1,
        paddingTop: 20,
        marginBottom: 70
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
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        color: "#5DC15F"
    },
    timezone: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    timetxt: {
        fontSize: 17,
        marginLeft: 5,
        color: "#505050",
        fontWeight: "500"
    },
    imagecontainer: {
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
    searcharea: {
        width: "100%",
        borderColor: "#F2F2F2",
        borderBottomWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingStart: 10,
        paddingEnd: 10,
        paddingVertical: 15,

    },
    searchinput: {
        backgroundColor: "#F7F7F7",
        borderRadius: 25,
        fontSize: 20,
        width: "100%",
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 60,
        color: "#505050"

    },
    searchbutton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        zIndex: 99
    },
    searchicon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingRight: 35
    },
    nothing: {
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    nothingtxt: {
        fontWeight: "bold",
        width: "85%",
        textAlign: "center",
        fontSize: 25,
        color: "#505050"
        //marginTop: 35
    },
})