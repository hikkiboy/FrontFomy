import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator } from "react-native"
import { Feather, FontAwesome } from 'react-native-vector-icons'
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
                    <TouchableOpacity style={{ zIndex: 99 }} onPress={() => handleModal()} >
                        <Feather style={styles.menu} name="menu" size={35} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.pfpstuff} >
                        <View style={styles.bgpfp} ></View>
                        <View style={styles.brdrpfp} >
                            <Image
                                source={{ uri: Receitas.Foto }}
                                style={styles.pfp}

                            />
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/bandeira-nivel.png')}
                                style={styles.flag}
                            />
                            <Text style={styles.lvl} >Lv. {Receitas.Nivel}</Text>
                        </View>
                        {inputOn == false ? (
                            <View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }} >
                                <Text style={styles.name} >{Receitas.Nome}</Text>
                                <Text style={styles.title} >{Receitas.Titulo}</Text>
                                <Progress.Bar style={{ justifyContent: 'center', marginTop: 45 }}
                                    progress={progressToBar}
                                    width={325}
                                    height={40}
                                    borderRadius={9}
                                    color="#FA787D"
                                    borderWidth={0}
                                    unfilledColor="#EFEFEF"
                                ><Text style={styles.exp} >EXP: {Receitas.Exp} / {totalXp}</Text></Progress.Bar>
                            </View>
                        ) : (
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 38, width: "100%", paddingHorizontal: 20 }} >
                                <View style={styles.inputarea} >
                                    <TextInput enterKeyHint={"done"} value={newName} onChangeText={(text) => setNewName(text)} autoFocus={true} maxLength={35} placeholder="Novo nome" style={styles.nameinput} />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'center', alignItems: 'center' }} >
                                    <TouchableOpacity activeOpacity={0.8} style={[styles.inputbutton, { backgroundColor: '#70D872', borderColor: '#5DC15F' }]} onPress={() => handleUpdate(true)} ><FontAwesome name="check" size={50} color="#FFF" /></TouchableOpacity>
                                    <View style={{ width: 50 }} />
                                    <TouchableOpacity activeOpacity={0.8} style={[styles.inputbutton, { backgroundColor: '#FA787D', borderColor: '#E15F64' }]} onPress={() => handleUpdate(false)} ><FontAwesome name="close" size={50} color="#FFF" /></TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <View style={{ width: "100%", height: 150 }} />
                        {Receitas.Insignias.length != 0 &&
                            <View style={styles.badgearea} >
                                <Text style={styles.badgetitle} >Insígnias</Text>
                                <View style={styles.stepslist} >
                                    <View style={styles.badges} >
                                        <Badges data={Receitas.Insignias} />
                                    </View>
                                </View>
                            </View>
                        }

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
        marginTop: 15,
        fontWeight: 'bold',
        color: "#303030"
    },
    inputarea: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 15,
        width: "100%"

    },
    inputbutton: {
        borderWidth: 5,
        borderBottomWidth: 7,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        paddingVertical: 5
    },
    nameinput: {
        textAlign: 'center',
        fontSize: 29,
        color: "#303030"

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
    exp: {
        position: 'absolute',
        alignSelf: 'center',
        color: "rgba(0,0,0,0.4)",
        fontWeight: 'bold',
        fontSize: 27
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