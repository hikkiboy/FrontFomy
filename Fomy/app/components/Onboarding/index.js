import { View, Text, Image, useWindowDimensions, StyleSheet, Button, FlatList, TouchableOpacity, ProgressBarAndroidBase } from 'react-native'
import * as Progress from 'react-native-progress'
import { useEffect, useState } from 'react'
import { doc, collection, query, where, onSnapshot, Firestore, documentId, orderBy, } from 'firebase/firestore'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth"
import Animated, { Extrapolate, interpolate, useAnimatedRef, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { FontAwesome } from 'react-native-vector-icons'
import AlbertoCustom from '../../components/customalberto'
import { useIsFocused } from '@react-navigation/native'



const OnboardingItem = ({ item, navigation, index, x, size }) => {

    const isFocused = useIsFocused();
    const [Usuarios, setUsuarios] = useState([]);
    const [progressToBar, setProgressToBar] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        try {
            const login = onAuthStateChanged(app_auth, (user) => {
                let proget = 0

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
                        setUsuarios(receitas)
                        if (item.NomeTrilha == "Básico") {
                            proget = receitas[0].Básico;
                        } else if (item.NomeTrilha == "Doces") {
                            proget = receitas[0].Doces;
                        } else if (item.NomeTrilha == "Gourmet") {
                            proget = receitas[0].Gourmet;
                        } else if (item.NomeTrilha == "Refeições") {
                            proget = receitas[0].Refeições;
                        }
                        setProgressToBar(proget / item.NumeroReceitas)
                        setProgress(proget)
                        //console.log(receitas)
                        //console.log(receitaRef)
                    }
                })
                return () => subscriver()
            })

            return () => login();
        } catch (error) {
            print(error)
        }
    }, [app_auth.currentUser])



    //console.log(Usuarios[0].ProgressoTrilhas);

    const { width } = useWindowDimensions()
    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
            ],
            [1, 4, 4],
            Extrapolate.CLAMP
        )
        return {
            transform: [{ scale: scale }]
        }
    })

    const [prem, setPrem] = useState()

    useEffect(() => {
        try {
            setPrem(Usuarios[0].Premium)
        } catch (error) {
            setPrem(false)
        }

    }, [Usuarios])


    return (
        <View style={[styles.container, { width }]}>

            {/* controle da animação do fundo não mexe nisso */}
            <View style={styles.circleContainer}>
                <Animated.View style={[{
                    width: width,
                    height: width,
                    backgroundColor: item.Cor,
                    borderRadius: width / 2
                }, circleAnimation]} />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 70 }}>

                {/* a estilização acontece daqui pra baixo */}
                {item.Imagem == "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Icones-Trilhas%2Fpalela2.png?alt=media&token=cf307cc6-f909-4491-b133-607cfc151b3d" && (

                    <View style={styles.imageContainer} >
                        {/* <Image source={require("../../assets/betterAlberto.png")} style={[styles.mascote]} /> */}
                        {isFocused == true && (
                            <AlbertoCustom style={[styles.mascote]} width={250} height={250} />
                        )}
                        <Image source={{ uri: item.Imagem }} style={[styles.acessorio, { height: 175, width: 175 }]} />
                    </View>
                )}
                {item.Imagem != "" && item.Imagem != "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Icones-Trilhas%2Fpalela2.png?alt=media&token=cf307cc6-f909-4491-b133-607cfc151b3d" && (
                    <View style={styles.imageContainer} >

                        {/* <Image source={require("../../assets/betterAlberto.png")} style={[styles.mascote]} /> */}
                        {isFocused == true && (
                            <AlbertoCustom style={[styles.customalbi]} width={250} height={250} />
                        )}

                        <Image source={{ uri: item.Imagem }} style={[styles.acessorio, { height: 135, width: 135 }]} />
                    </View>
                )}
                {item.Imagem == "" && (
                    <View style={[styles.imageContainer, { justifyContent: 'center' }]} >
                        {/* <Image source={require("../../assets/betterAlberto.png")} style={[styles.mascote]} /> */}
                        {isFocused == true && (
                            <AlbertoCustom style={[styles.customalbi]} width={250} height={250} />
                        )}

                    </View>
                )}

                <Text allowFontScaling={false} style={styles.title}>{item.NomeTrilha}</Text>
                <Text allowFontScaling={false} style={styles.description}>{item.Descricao}</Text>

                {/* <Progress.Bar style={styles.barra} unfilledColor='white' borderColor='black'   progress={Usuarios[0].ProgressoTrilhas[item.indexTrilha]}  width={250} height={20} color='#32a852'><Text style={{position:'absolute', flex:0, alignSelf: 'center'}}>{Usuarios[0].ProgressoTrilhas[item.indexTrilha] * 10} / {item.NumeroReceitas}</Text></Progress.Bar> */}


                {/* SE TIVER PREMIUM RENDERIZA O BOTÃO*/}

                {item.NomeTrilha == "Gourmet" && prem == true && (
                    <>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Trilha", { paramKey: [item.NomeTrilha, item.Descricao, item.Cor, item.CorBorda, item.CorFill] })} style={[styles.buttonRegistro, { borderColor: item.CorBorda, backgroundColor: item.CorFill }]} title='Registrar' >
                            <Text allowFontScaling={false} style={[styles.botaoTexto]}>Entrar</Text>
                        </TouchableOpacity>
                        <View style={{ alignSelf: "center", marginTop: "10%", }} >
                            <View style={{ backgroundColor: item.CorBorda, width: 250, height: 35, position: 'absolute', borderRadius: 12, marginTop: 12 }} />
                            <Progress.Bar
                                style={{ borderWidth: 4, borderColor: item.CorBorda, justifyContent: 'center' }}
                                progress={progressToBar}
                                width={250}
                                height={35}
                                borderRadius={12}
                                color={item.CorFill}
                                borderWidth={0}
                                unfilledColor={progressToBar != 1 ? "#FFF" : item.CorFill}
                            ><Text allowFontScaling={false} style={{ position: 'absolute', alignSelf: 'center', color: progressToBar != 1 ? "#303030" : "#FFF", fontSize: 20, fontFamily: "FredokaSemibold" }}  >{progress}/{item.NumeroReceitas}</Text></Progress.Bar>

                        </View>
                    </>
                )}

                {/* SE A TRILHA NÃO FOR A GOURMET RENDERIZA O BOTÃO*/}
                {item.NomeTrilha != "Gourmet" && (
                    <>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Trilha", { paramKey: [item.NomeTrilha, item.Descricao, item.Cor, item.CorBorda, item.CorFill] })} style={[styles.buttonRegistro, { borderColor: item.CorBorda, backgroundColor: item.CorFill }]} title='Registrar' >
                            <Text allowFontScaling={false} style={[styles.botaoTexto]}>Entrar</Text>
                        </TouchableOpacity>
                        <View style={{ alignSelf: "center", marginTop: "10%", }} >
                            <View style={{ backgroundColor: item.CorBorda, width: 250, height: 35, position: 'absolute', borderRadius: 12, marginTop: 12 }} />
                            <Progress.Bar
                                style={{ borderWidth: 4, borderColor: item.CorBorda, justifyContent: 'center' }}
                                progress={progressToBar}
                                width={250}
                                height={35}
                                borderRadius={12}
                                color={item.CorFill}
                                borderWidth={0}
                                unfilledColor={progressToBar != 1 ? "#FFF" : item.CorFill}
                            ><Text allowFontScaling={false} style={{ position: 'absolute', alignSelf: 'center', color: progressToBar != 1 ? "#303030" : "#FFF", fontSize: 20, fontFamily: "FredokaSemibold" }}  >{progress}/{item.NumeroReceitas}</Text></Progress.Bar>

                        </View>
                    </>
                )}
                {/* SE FOR A GOURMET E NAO TIVER PREMIUM RENDERIZA O TEXTO*/}
                {item.NomeTrilha == "Gourmet" && prem == false && (
                    <>
                        <TouchableOpacity activeOpacity={0.8} style={[styles.buttonRegistro, { borderColor: item.CorBorda, backgroundColor: item.CorFill }]} title='Registrar' onPress={() => navigation.navigate("Store")} >
                            <Text allowFontScaling={false} style={[styles.botaoTexto]}>Comprar</Text>
                            <Text allowFontScaling={false} style={[styles.botaoTexto, { marginTop: 2 }]}>Premium</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {index == 0 ? (
                <View style={styles.dotarea} >
                    <View style={styles.dotactive} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
            ) : index == 1 ? (
                <View style={styles.dotarea} >
                    <View style={styles.dot} />
                    <View style={styles.dotactive} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
            ) : index == 2 ? (
                <View style={styles.dotarea} >
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dotactive} />
                    <View style={styles.dot} />
                </View>
            ) : index == 3 ? (
                <View style={styles.dotarea} >
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dotactive} />
                </View>
            ) : (
                <View style={styles.dotarea} >
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dotactive} />
                </View>
            )}

        </View>



    )
}
export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: "FredokaBold",
        fontSize: 32,
        marginBottom: 10,
        textAlign: 'center',
        color: '#303030'
    },
    description: {
        fontFamily: "FredokaSemibold",
        fontSize: 23,
        minHeight: 55,
        marginTop: 7,
        textAlign: 'center',
        paddingHorizontal: 64,
        color: '#303030',
        opacity: 0.8
    },
    premiumDesc: {
        fontWeight: '300',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 18,
        paddingHorizontal: 64
    },
    imageContainer: {
        height: 241,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingEnd: 20,
        paddingStart: 20,
        flexDirection: 'row-reverse',
        marginBottom: 30
    },
    mascote: {
        height: 241,
        width: 199,
    },
    acessorio: {
        marginRight: -70,
        resizeMode: 'contain'
    },
    itemContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    buttonRegistro: {
        alignSelf: "center",
        padding: 15,
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 6,
        borderBottomWidth: 9,
        marginTop: 25,
        marginBottom: 5,
        borderRadius: 15,
        width: 250,
    },
    botaoTexto: {
        fontFamily: "FredokaSemibold",
        fontSize: 25,
        textAlign: 'center',
        color: "#FFF"
    },
    barra: {
        alignSelf: 'center',
        marginBottom: 10

    },
    customalbi: {
        left: 100,
        backgroundColor: 'red'
    },
    dot: {
        height: 10,
        width: 10,
        backgroundColor: "#303030",
        opacity: 0.5,
        borderRadius: 5,
        marginHorizontal: 10
    },
    dotactive: {
        height: 10,
        width: 10,
        backgroundColor: "#303030",
        borderRadius: 5,
        marginHorizontal: 10
    },
    dotarea: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 105,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'flex-end',
    }

})


