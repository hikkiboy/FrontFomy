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
import { LogBox } from "react-native"

LogBox.ignoreAllLogs(); //Ignore all log notifications

const Profile = ({ navigation }) => {

    const [Receitas, setReceitas] = useState([])
    const [visible, setVisible] = useState(false)
    const [inputOn, setInputOn] = useState(false)
    const [newName, setNewName] = useState('')
    const [progressToBar, setProgressToBar] = useState(0)
    const width = Dimensions.get('window').width

    useEffect(() => {
        try {
            const login = onAuthStateChanged(app_auth, (user) => {
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
                        setProgressToBar(receitas[0].Exp / receitas[0].ExpLevel)
                        console.log("Queried the profile, reason: auth state update.")



                    }
                })

                return () => subscriver()

            });

            return () => login();

        } catch (error) {
            console.log("User uid error, probably logged off")
        }
    }, []);

    const handleModal = () => {
        setVisible(!visible);
        setInputOn(false);
        setNewName('');
    }

    const handleModalSignOut = () => {
        setVisible(!visible);
        setReceitas([]);
        app_auth.signOut();
        AsyncStorage.clear();
    }

    const handleInput = () => {
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
                <ScrollView style={{ flexGrow: 1 }} >

                    <TouchableOpacity activeOpacity={0.8} style={{ zIndex: 99 }} onPress={() => handleModal()} >
                        <FontAwesome6 style={styles.menu} name="gear" size={27} color="#FFF" />
                    </TouchableOpacity>
                    <View style={{ paddingStart: 5, paddingEnd: 5, marginBottom: 50, marginTop: 5 }} >
                        <View style={styles.bgimg}>
                            <View style={styles.titlearea} >
                                <View style={{ borderWidth: 6, borderRadius: 100, marginRight: 5, borderColor: "#2985DB" }} >
                                    <Image style={styles.notalberto} source={{ uri: Receitas.Foto }} />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text allowFontScaling={false} style={[styles.trilhaTit, { fontSize: 27 }]}>{Receitas.Nome}</Text>
                                    <Text allowFontScaling={false} style={[styles.trilhaTit, { color: "rgba(255,255,255,0.85)", fontSize: 23 }]}>{Receitas.Titulo}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 70 }} >
                        <View style={{ width: "100%", alignItems: 'center' }}>
                            <View style={{ width: "100%", paddingHorizontal: 10 }} >
                                <View style={{ backgroundColor: "#3B98EF", borderRadius: 15, paddingVertical: 6, borderWidth: 6, borderBottomWidth: 9, borderColor: "#2985DB" }} >
                                    <Text allowFontScaling={false} style={[styles.trilhaTit, { marginBottom: 0 }]}>Nível {Receitas.Nivel}</Text>
                                </View>
                            </View>
                            <View style={{ alignSelf: "center", marginTop: 30, paddingBottom: 5 }} >
                                {/* <View style={{ width: width - 20, height: "100%", backgroundColor: "#e9e9e9", position: 'absolute', borderRadius: 20, marginTop: 2 }}/> */}
                                    <Progress.Bar
                                        style={{ justifyContent: 'center' }}
                                        progress={progressToBar}
                                        width={width - 20}
                                        height={47}
                                        borderRadius={15}
                                        borderWidth={5}
                                        color={"#3B98EF"}
                                        borderColor={"#FFF"}
                                        unfilledColor={progressToBar != 1 ? "#e9e9e9" : item.CorFill}
                                    >
                                        <Text allowFontScaling={false} style={{ position: 'absolute', alignSelf: 'center', color: progressToBar != 1 ? "#303030" : "#FFF", fontSize: 25, fontFamily: "FredokaSemibold" }}  >XP: {Receitas.Exp} / {Receitas.ExpLevel}</Text>
                                    </Progress.Bar>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1 }} />
                        {Receitas.Insignias.length != 0 &&
                            <View style={{ width: "100%", alignItems: 'center' }} >
                                <View style={{ width: "100%", paddingHorizontal: 10 }} >
                                    <View style={{ backgroundColor: "#3B98EF", borderRadius: 15, paddingVertical: 6, borderWidth: 6, borderBottomWidth: 9, borderColor: "#2985DB" }} >
                                        <Text allowFontScaling={false} style={[styles.trilhaTit, { marginBottom: 0 }]}>Insígnias</Text>
                                    </View>
                                </View>
                                <View style={{ width: "100%", paddingHorizontal: 10 }} >
                                    <View style={styles.badgearea} >
                                        <View style={styles.stepslist} >
                                            <View style={styles.badges} >
                                                <Badges data={Receitas.Insignias} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }

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
                                input={inputOn}
                                changeInput={setInputOn}
                                name={newName}
                                nameChange={setNewName}
                                update={handleUpdate}

                            />
                        </Modal>
                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF" }} >
                    <ActivityIndicator size={120} color={"#3B98EF"} />
                    <Text allowFontScaling={false} style={{ marginTop: 15, fontSize: 22, fontFamily: "FredokaSemibold", textAlign: 'center', width: "90%" }} >Carregando...</Text>
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
    },
    bgimg: {
        width: "100%",
        borderRadius: 20,
        borderWidth: 6,
        borderBottomWidth: 9,
        borderColor: "#2985DB",
        backgroundColor: "#3B98EF",
        alignItems: 'center'
    },
    menu: {
        position: "absolute",
        alignSelf: 'flex-end',
        padding: 20,

    },
    booklet: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    titlearea: {
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 20,
        zIndex: 98,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    notalberto: {
        width: 115,
        height: 115,
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
        fontSize: 26,
        fontFamily: "FredokaSemibold",
        color: "#FFF",
        //fontFamily: FontFamily.leagueSpartanBold
    },
    exp: {
        position: 'absolute',
        alignSelf: 'center',
        color: "rgba(255,255,255,0.95)",
        fontFamily: "FredokaSemibold",
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
        
    },
    badgearea: {
        backgroundColor: "#FFF",
        width: '100%',
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 70,
        borderColor: "#E9E9E9",
        borderWidth: 6,
        borderBottomWidth: 9

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

    },

})