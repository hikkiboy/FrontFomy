import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator, Dimensions } from "react-native"
import { Feather, FontAwesome, FontAwesome6 } from 'react-native-vector-icons'
import { useState, useEffect } from "react"
import { ActionModal } from "../../components/actionmodal"
import { Badges } from "../../components/badges"
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc, collection, query, where, onSnapshot, documentId, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import * as Progress from "react-native-progress"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Profile = ({ navigation }) => {

    const [Receitas, setReceitas] = useState([])
    const [visible, setVisible] = useState(false)
    const [inputOn, setInputOn] = useState(false)
    const [newName, setNewName] = useState('')
    const [totalXp, setTotalXP] = useState(0)
    const [progressToBar, setProgressToBar] = useState(0)
    const width = Dimensions.get('window').width

    useEffect(() => {
        const login = onAuthStateChanged(app_auth, (user) => {
            try {
                const receitaRef = collection(app_DB, 'Usuarios')

                const q = query(
                    receitaRef,
                    where(documentId(), '==', app_auth.currentUser.uid)
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
                        setReceitas(receitas[0])
                        let total = 200 + (((receitas[0].Nivel - 1) * receitas[0].Nivel) * 10)
                        setTotalXP(total)
                        setProgressToBar(receitas[0].Exp / total)
                        console.log("Queried the profile, reason: auth state update.")



                    }
                })

                return () => subscriver()
            } catch (error) {
                console.log("User uid error, probably logged off")
            }

        });

        return () => login();
    }, []);

    const handleModal = () => {
        setVisible(!visible);
    }

    const handleModalSignOut = () => {
        setVisible(!visible);
        setReceitas([]);
        app_auth.signOut();
        AsyncStorage.clear();
    }

    const handleInput = () => {
        setVisible(false)
        setInputOn(true);
    }

    const handleUpdate = async (update) => {
        if (newName != '' && update) {
            try {
                const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
                await updateDoc(userRef, {
                    Nome: newName
                });
                setInputOn(false);
                setNewName('')
            } catch (error) {
                console.log(error)
                alert("Ocorreu um erro " + error)
            }
        } else {
            setNewName('')
            setInputOn(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} >
            {Receitas.length != 0 ? (
                <ScrollView contentContainerStyle={{ minHeight: "100%", width: "100%" }} >
                    <View style={styles.bgimg}>
                        <Image tintColor={"#2985DB"} style={styles.booklet} source={require('../../assets/profilet.png')} />
                        <View style={styles.titlearea} >
                            <View style={{ borderWidth: 6, borderRadius: 100, marginRight: 5, borderColor: "#2985DB" }} >
                                <View>
                                    <Image style={styles.notalberto} source={{ uri: Receitas.Foto }} />
                                    <View>
                                        <Image
                                            source={require('../../assets/bandeira-nivel.png')}
                                            style={styles.flag}
                                        />
                                        <Text style={styles.lvl} >Lv. {Receitas.Nivel}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={[styles.trilhaTit,]}>{Receitas.Nome}</Text>
                                <Text style={[styles.trilhaTit, { marginTop: 15, color: "rgba(255,255,255,0.85)", fontSize: 24 }]}>{Receitas.Titulo}</Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: "center", marginVertical: 20, marginBottom: 50 }} >
                            <View style={{ backgroundColor: "#296CAA", width: width - 40, height: 35, position: 'absolute', borderRadius: 12, marginTop: 15 }} />
                            <Progress.Bar
                                style={{ borderWidth: 4, borderColor: "#296CAA", justifyContent: 'center' }}
                                progress={progressToBar}
                                width={width - 40}
                                height={35}
                                borderRadius={12}
                                color={"#2985DB"}
                                borderWidth={0}
                                unfilledColor={progressToBar != 1 ? "#FFF" : item.CorFill}
                            ><Text style={{ position: 'absolute', alignSelf: 'center', color: progressToBar != 1 ? "rgba(0,0,0,0.75)" : "#FFF", fontSize: 23, fontWeight: 'bold' }}  >XP: {Receitas.Exp} / {totalXp}</Text></Progress.Bar>
                        </View>
                    </View>

                    <View style={styles.moneycontainer} >
                        <View style={{ backgroundColor: "#2985DB", width: "100%", height: "100%", position: 'absolute', borderRadius: 20, marginTop: 5 }} />
                        <TouchableOpacity activeOpacity={0.9} style={styles.moneyarea} onPress={() => handleModal()} >
                            <FontAwesome6 name='gear' size={37} color={"#FFF"} />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={styles.monay} >Configurações</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.badgearea} >
                        <Text style={styles.badgetitle} >Insígnias</Text>
                        <View style={styles.stepslist} >
                            <View style={styles.badges} >
                                <Badges data={Receitas.Insignias} />
                            </View>
                        </View>
                    </View>


                    <Modal visible={visible}
                        onRequestClose={handleModal}
                        animationType="slide"
                        transparent={true}
                    >
                        <ActionModal
                            handleActionOff={handleModalSignOut}
                            handleAction={handleModal}
                            navigation={navigation}
                            handleName={handleInput}
                            userImage={Receitas.Foto}

                        />
                    </Modal>
                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF" }} >
                    <ActivityIndicator size={120} color={"#3B98EF"} />
                    <Text style={{ marginTop: 15, fontSize: 20, textAlign: 'center', width: "90%" }} >Carregando...</Text>
                </View>
            )
            }

        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 80
    },
    bgimg: {
        width: "100%",
        borderRadius: 20,
        marginBottom: 45,
        backgroundColor: "#3B98EF",
        alignItems: 'center'
    },
    booklet: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    titlearea: {
        width: '100%',
        paddingStart: 20,
        paddingEnd: 10,
        marginTop: 35,
        zIndex: 98,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    notalberto: {
        width: 120,
        height: 120,
        borderRadius: 100,

    },
    flag: {
        alignSelf: 'center',
        position: 'absolute',
        width: 145.6,
        height: 33.6,
        bottom: -10
    },
    lvl: {
        alignSelf: 'center',
        fontSize: 22,
        position: "absolute",
        bottom: -5,
        fontWeight: '700'

    },
    trilhaTit: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF",
        //fontFamily: FontFamily.leagueSpartanBold
    },
    exp: {
        position: 'absolute',
        alignSelf: 'center',
        color: "rgba(255,255,255,0.95)",
        fontWeight: 'bold',
        fontSize: 27
    },
    moneycontainer: {
        width: "100%",
        marginBottom: 140
    },
    moneyarea: {
        backgroundColor: "#3B98EF",
        borderColor: "#2985DB",
        borderRadius: 20,
        borderWidth: 6,
        width: "100%",
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
    badgearea: {
        backgroundColor: "#EFEFEF",
        width: '100%',
        borderRadius: 20,
        padding: 15,
        paddingBottom: 18,
        paddingTop: 12,
        marginBottom: 70,
        backgroundColor: "#3B98EF",
        borderColor: "#2985DB",
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

})