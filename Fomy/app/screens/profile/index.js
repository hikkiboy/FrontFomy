import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput, Alert, Dimensions, ScrollView, AppRegistry, ActivityIndicator } from "react-native"
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from "react"
import { ActionModal } from "../../components/actionmodal"
import { Badges } from "../../components/badges"
import { app_auth, app_BKT, app_DB } from '../../../firebaseConfig'
import { doc, collection, query, where, onSnapshot, documentId, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import * as Progress from "react-native-progress"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile({ navigation }) {

    const [Receitas, setReceitas] = useState()
    const [user, setUser] = useState()
    const height = Dimensions.get("window").height
    const [visible, setVisible] = useState(false)
    const [inputOn, setInputOn] = useState(false)
    const [newName, setNewName] = useState('')

    let visibleInput = null
    let visibleClose = null
    let visibleSend = null

    useEffect(() => {
        const login = onAuthStateChanged(app_auth, (user) => {
            try {
                //the setUser works as a way to make the dependecy (app_auth.currentUser.uid) actually make useEffect happen
                //don't know exactly why it works like that, but it works
                //there's still the problem that it flashes the old user for a sec when working through asyncstorage
                //but I think this is better than updating the profile each time the user accesses it
                const receitaRef = collection(app_DB, 'Usuarios')

                const q = query(
                    receitaRef,
                    where(documentId(), '==', app_auth.currentUser.uid)
                )

                setUser(app_auth.currentUser.uid)

                const subscriver = onSnapshot(q, {
                    next: (snapshot) => {
                        const receitas = []

                        snapshot.docs.forEach(doc => {
                            receitas.push({
                                key: doc.id,
                                ...doc.data(),

                            })
                        })
                        setReceitas(receitas)
                        console.log(app_auth.currentUser.email)
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
        setReceitas();
        app_auth.signOut();
        AsyncStorage.clear();
        ReactNativeAsyncStorage.clear();
    }

    const handleInput = () => {
        setVisible(false)
        setInputOn(true);
    }

    const closeThisBitchUp = () => {
        setNewName('')
        setInputOn(false);
    }

    const handleUpdate = async () => {
        if (newName != '') {
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
            setInputOn(false);
        }
    };

    if (Receitas != undefined) {
        let nome = Receitas[0].Nome
        let titulo = Receitas[0].Titulo

        let totalXp = 200 + (((Receitas[0].Nivel - 1) * Receitas[0].Nivel) * 10)
        let progressToBar = (Receitas[0].Exp / totalXp)

        let progressMyBar = (
            <Progress.Bar style={{ position: 'absolute' }}
                progress={progressToBar}
                width={325}
                height={40}
                borderRadius={9}
                color="#FA787D"
                borderWidth={0}
                unfilledColor="#EFEFEF"
            />
        )
        let progressExp = (
            <Text style={styles.exp} >EXP: {Receitas != undefined ? Receitas[0].Exp : 0} / {totalXp}</Text>
        )

        if (inputOn) {
            nome = null
            titulo = null
            progressMyBar = null
            progressExp = null
            visibleInput = (<TextInput enterKeyHint={"done"} value={newName} onChangeText={(text) => setNewName(text)} autoFocus={true} maxLength={35} placeholder="Digite o nome" style={styles.nameinput} />)
            visibleSend = (<TouchableOpacity style={{ marginRight: 30 }} onPress={handleUpdate} ><Ionicons name="checkmark-circle" size={50} color="#70D872" /></TouchableOpacity>)
            visibleClose = (<TouchableOpacity onPress={closeThisBitchUp} ><Ionicons name="close-circle" size={50} color="#FA787D" /></TouchableOpacity>);
        }

        return (
            <SafeAreaView style={styles.container} >
                <ScrollView contentContainerStyle={{ minHeight: "100%", width: "100%" }} >
                    <TouchableOpacity style={{ zIndex: 99 }} onPress={handleModal} >
                        <Feather style={styles.menu} name="menu" size={35} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.pfpstuff} >
                        <View style={styles.bgpfp} ></View>
                        <View style={styles.brdrpfp} >
                            <Image
                                source={{ uri: Receitas[0].Foto }}
                                style={styles.pfp}

                            />
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/bandeira-nivel.png')}
                                style={styles.flag}
                            />
                            <Text style={styles.lvl} >Lv. {Receitas[0].Nivel}</Text>
                            <View>
                                <Text style={styles.name} >{nome}</Text>
                                <Text style={styles.title} >{titulo}</Text>

                                <View style={styles.inputarea} >
                                    {visibleInput}
                                </View>
                                <View style={styles.buttonarea} >
                                    {visibleSend}
                                    {visibleClose}
                                </View>
                            </View>
                        </View>
                        <View style={styles.progressbar} >
                            {progressMyBar}
                            {progressExp}

                        </View>

                        <View style={{ flex: 1, width: "100%" }} />
                        <View style={styles.badgearea} >
                            <Text style={styles.badgetitle} >Insígnias</Text>
                            <View style={styles.stepslist} >
                                <View style={styles.badges} >
                                    <Badges data={Receitas[0]} />
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>

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
                        userImage={Receitas[0].Foto}

                    />
                </Modal>

            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF" }} >
                <ActivityIndicator size={120} color={"#3B98EF"} />
                <Text style={{ marginTop: 15, fontSize: 20, textAlign: 'center', width: "90%" }} >Carregando...</Text>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: 'flex',
        backgroundColor: "#FFF"
    },
    pfp: {
        width: 175,
        height: 175,
        borderRadius: 100,
    },
    pfpstuff: {
        alignItems: 'center',
        flex: 1
    },
    bgpfp: {
        backgroundColor: "#3B98EF",
        width: '100%',
        height: 130,
        position: "absolute"
    },
    brdrpfp: {
        width: 195,
        height: 195,
        borderRadius: 150,
        borderWidth: 10,
        marginBottom: -100,
        borderColor: "#FFF",
        backgroundColor: "#EFEFEF",
        marginTop: 35
    },
    name: {
        alignSelf: 'center',
        fontSize: 29,
        marginTop: 12,
        fontWeight: 'bold',
        color: "#303030"
    },
    nameinput: {
        backgroundColor: "#3B98EF",
        paddingHorizontal: 12,
        borderRadius: 15,
        textAlign: 'center',
        width: 320,
        fontSize: 29

    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: "#909090"
    },
    flag: {
        alignSelf: 'center',
        width: 208,
        height: 48,
        marginTop: 60
    },
    lvl: {
        alignSelf: 'center',
        fontSize: 27,
        position: "absolute",
        marginTop: 60,
        fontWeight: '700'

    },
    menu: {
        position: "absolute",
        alignSelf: 'flex-end',
        padding: 15,

    },
    inputarea: {
        position: 'absolute',
        marginTop: 23,
        alignItems: 'center',
        alignSelf: 'center'

    },
    buttonarea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 70,
        position: 'absolute',
        alignSelf: 'center',

    },
    exp: {
        position: 'absolute',
        alignSelf: 'center',
        color: "#909090",
        fontWeight: 'bold',
        fontSize: 27
    },
    progressbar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45,
        marginBottom: 100
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