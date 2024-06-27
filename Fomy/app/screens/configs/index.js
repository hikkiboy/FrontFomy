import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable, Modal } from "react-native"
import { app_auth, app_DB } from '../../../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, documentId, where, query, updateDoc, doc } from "firebase/firestore"
import { useLayoutEffect, useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather, FontAwesome, FontAwesome6 } from 'react-native-vector-icons'
import { ScrollView } from "react-native"
import { ModalTerm } from "../../components/actionmodal/modalterms";


export default function Configs({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [premium, setPremium] = useState(route.params?.premium[0])
    const [thanksAlert, setThanksAlert] = useState(false)

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    async function buyPremium() {
        if (!premium) {
            try {
                const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)
                await updateDoc(userRef, {
                    Premium: true
                }).then(() => {
                    setThanksAlert(true)
                    setPremium(true)
                    console.log("updatou")
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)

                await updateDoc(userRef, {
                    Premium: false
                }).then(() => {
                    setPremium(false)
                    console.log("updatou")
                })
            } catch (error) {
                console.log(error);
            }
        }

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex' }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 10 }} >
                        <View style={{ width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center', borderRadius: 10 }} >
                            <TouchableOpacity activeOpacity={0.8} style={{ width: "8.5%", marginStart: 20 }} onPress={() => navigation.goBack()} ><FontAwesome size={25} color={"#303030"} name='arrow-left' /></TouchableOpacity>
                            <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                                <Text allowFontScaling={false} style={{ fontSize: 25, fontFamily: "FredokaSemibold", alignSelf: 'center', position: 'absolute', color: "#303030" }} >Configurações</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            )
            /*title: "",
            headerRight: () => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', width: "92%", alignSelf: 'center', textAlign: 'center', color: "black", zIndex: 1}} >Configurações</Text>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ zIndex: 99, backgroundColor: 'blue' }} onPress={() => {navigation.goBack()}} ><Feather name="chevron-left" size={32} color={"black"} /></TouchableOpacity>
            )*/
        })
    }, [navigation])

    return (
        <SafeAreaView style={styles.container} >

            <ScrollView contentContainerStyle={styles.content} >

                <Modal
                    visible={thanksAlert}
                    transparent={true}
                    animationType='fade'
                >
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.2)", paddingHorizontal: 10 }} >
                        <View style={{ alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, width: "100%", paddingVertical: 30, paddingHorizontal: 10 }} >
                            <FontAwesome6 name="face-laugh" size={80} color={"#ED8A07"} />
                            <Text allowFontScaling={false} style={{ fontSize: 25, color: "#ED8A07", fontFamily: "FredokaSemibold", marginBottom: 20, marginTop: 15, width: "100%", textAlign: 'center' }} >Muito obrigado!</Text>
                            <Text allowFontScaling={false} style={{ fontSize: 21, color: "#505050", fontFamily: "FredokaMedium", marginBottom: 45, width: "100%", textAlign: 'center' }} >Você assinando premium nos ajuda a continuar a fazer o que gostamos!</Text>
                            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "#FAB151", width: "100%", alignItems: 'center', justifyContent: 'center', borderRadius: 20, paddingVertical: 8, borderWidth: 6, borderBottomWidth: 9, borderColor: "#ED8A07" }} onPress={() => setThanksAlert(false)} >
                                <Text allowFontScaling={false} style={{ fontSize: 24, fontFamily: "FredokaSemibold", color: "#303030" }} >Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>

                <View style={styles.bgpref}>
                    <Text allowFontScaling={false} style={styles.title} >Conta</Text>
                </View>

                <View style={styles.configlist} >
                    <TouchableOpacity style={styles.optionbutton} onPress={() => navigation.navigate("AlterPassword")} activeOpacity={0.8} >
                        <Text allowFontScaling={false} style={styles.option} >Mudar senha</Text>
                        <FontAwesome6 name="chevron-right" size={22} color={"#505050"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionbutton} onPress={() => navigation.navigate("AlterEmail")} activeOpacity={0.8} >
                        <Text allowFontScaling={false} style={styles.option} >Mudar email</Text>
                        <FontAwesome6 name="chevron-right" size={22} color={"#505050"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} onPress={handleOpenModal} >
                        <Text allowFontScaling={false} style={styles.option} >Política de privacidade</Text>
                        <FontAwesome6 name="chevron-right" size={22} color={"#505050"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bgpremium}>
                    <Text allowFontScaling={false} style={styles.title} >Premium</Text>
                </View>
                <View style={[styles.configlist, { marginBottom: 0 }]} >
                    <TouchableOpacity onPress={() => buyPremium()} style={styles.lastoptionbutton} activeOpacity={0.8} >
                        <Text allowFontScaling={false} style={styles.option} >{premium ? "Cancelar" : "Comprar"} Premium</Text>
                        <FontAwesome6 name="chevron-right" size={22} color={"#505050"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.deletearea} >
                    <TouchableOpacity style={styles.delete} onPress={() => navigation.navigate("DeleteAccount")} activeOpacity={0.8} >
                        <Text allowFontScaling={false} style={[styles.action, { color: "#FFF", fontSize: 21 }]} >Deletar Conta</Text>
                        <FontAwesome6 color="#FFF" name="fire" size={24} />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <ModalTerm handleCloseModal={handleCloseModal} />
                </Modal>


            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",

    },
    content: {
        flexGrow: 1,
        marginTop: 80,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 26,
        fontFamily: "FredokaSemibold",
        color: "#FFF",
    },
    configlist: {
        borderWidth: 6,
        borderBottomWidth: 9,
        borderRadius: 20,
        borderColor: "#E9E9E9",
        marginBottom: 60


    },
    optionbutton: {
        borderBottomWidth: 5,
        borderColor: "#E9E9E9",
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    option: {
        fontFamily: "FredokaSemibold",
        fontSize: 20,
        color: "#505050"
    },
    lastoptionbutton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    action: {
        fontSize: 20,
        fontFamily: "FredokaSemibold",
    },
    deletearea: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50
    },
    delete: {
        zIndex: 99,
        backgroundColor: "#FA787D",
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        borderWidth: 5,
        borderBottomWidth: 10,
        borderColor: "#E15F64",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    bgpref: {
        width: "100%",
        borderRadius: 20,
        borderWidth: 6,
        borderBottomWidth: 9,
        borderColor: "#2985DB",
        backgroundColor: "#3B98EF",
        alignItems: 'center',
        marginBottom: 30,
        paddingVertical: 5
    },
    bgpremium: {
        width: "100%",
        borderRadius: 20,
        borderWidth: 6,
        borderBottomWidth: 9,
        borderColor: "#ED8A07",
        backgroundColor: "#FAB151",
        alignItems: 'center',
        marginBottom: 30,
        paddingVertical: 5
    },


})



