import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, LogBox, ScrollView, Modal } from 'react-native'
import { useState, useEffect } from 'react'
import { FontAwesome5, Feather, Octicons, FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

//ASLKDMASFMALGMLGSA

export function ModalBook({ navigation, fullListing, user, fullTrilha, name, handleModal }) {

    const [listing, setListing] = useState([])
    const [trilha, setTrilha] = useState([])
    let listArray = []
    let trilhaArray = []

    console.log("HELP ME GOD");//( ele me ajudou :) )

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    function colorThis() {
        fullListing.filter(item => item.NomeTrilha == name && listArray.push(item))
        fullTrilha.filter(item => item.NomeTrilha == name && trilhaArray.push(item))

        setListing(listArray)
        setTrilha(trilhaArray);
        console.log(listArray);
        console.log(trilhaArray);
    }

    useEffect(() => {
        if (fullListing.length != 0 && user.ReceitasFeitas != undefined && user.ReceitasFeitas != {} && user.ReceitasFeitas != "" && user.ReceitasFeitas != null) {
            try { colorThis(); console.log("colored"); } catch (error) { console.log(error) }
        }
    }, [user])

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView>
                <View style={styles.thisthing} >
                    <View style={styles.whydoyoudothis} >
                        <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', paddingBottom: 6, paddingStart: 10 }} onPress={() => handleModal(name)} >
                            <FontAwesome size={30} color={"#FFF"} name='arrow-left'/>
                        </TouchableOpacity>
                        <Text allowFontScaling={false} style={{ alignSelf: 'center', fontFamily: "FredokaSemibold", fontSize: 30, color: "#FFF" }} >{name}</Text>
                    </View>
                </View>

                <FlatList
                    data={listing}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.itemcontainer} >
                            <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => { handleModal(name); navigation.navigate('Preparo', { paramKey: [item.Nome, trilha[0].Cor, item.Icone, trilha[0].CorBorda, trilha[0].CorFill],  user: [user.ReceitasFeitas], origin: ["Book"], description: [""] }); }}>
                                <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: '#E9E9E9', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />
                                <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: "#FFF", position: 'absolute', borderRadius: 20, borderColor: '#E9E9E9', borderWidth: 7 }]} />
                                <View style={[{ height: '100%', width: 120, zIndex: 1, backgroundColor: '#D383E3', position: 'absolute', borderRadius: 20, marginTop: 6 }]} />

                                <View style={[styles.imagecontainer, { borderColor: '#D383E3' }]}>

                                    <Image style={styles.icon} source={{ uri: item.Icone }} />

                                </View>
                                <View style={[styles.rightRow]} >
                                    <Text allowFontScaling={false}  style={[styles.descricaoFase, { color: '#be48d5' }]}>{item.Nome}</Text>
                                    {item.Tempo != null && item.Tempo != undefined && (
                                        <View style={styles.timezone} >
                                            <>
                                                <FontAwesome5 name="clock" size={20} color={"#505050"} />
                                                <Text allowFontScaling={false} style={styles.timetxt} >{item.Tempo} minutos</Text>
                                            </>
                                        </View>
                                    )}
                                </View>

                            </TouchableOpacity>
                        </View>

                    )}
                />
            </ScrollView>
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        width: "100%",
        flex: 1,
    },
    thisthing:{
        paddingHorizontal: 10,
        width: "100%",
        marginVertical: 20,
        marginBottom: 40
    },
    whydoyoudothis:{
        backgroundColor: "#D383E3",
        paddingVertical: 8,
        borderColor: "#be48d5",
        borderWidth: 7,
        borderBottomWidth: 13,
        borderRadius: 20,
        justifyContent: 'center',
    },
    icon: {
        width: 65,
        height: 65,
        alignSelf: 'center',
        paddingVertical: 20
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
        fontSize: 21,
        fontFamily: "FredokaSemibold",
        textAlign: 'center',
        width: '100%',
        color: "#5DC15F"
    },
    timezone: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    timetxt: {
        fontSize: 18,
        marginLeft: 6,
        color: "#505050",
        fontFamily: "FredokaMedium"
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
        paddingStart: 20,
        paddingEnd: 20,
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
        color: "#000"

    },
    searchbutton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    searchicon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingRight: 35
    },
    nothing: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        width: "100%",
        flex: 1,
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    nothingtxt: {
        fontWeight: "bold",
        width: "85%",
        textAlign: "center",
        fontSize: 25,
        //marginTop: 35
    },
    nothing: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        width: "100%",
        flex: 1,
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    nothingtxt: {
        fontWeight: "bold",
        width: "85%",
        textAlign: "center",
        fontSize: 25,
        //marginTop: 35
    },
})