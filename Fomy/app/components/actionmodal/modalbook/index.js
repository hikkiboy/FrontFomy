import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, LogBox, ScrollView, Modal } from 'react-native'
import { useState, useEffect } from 'react'
import { FontAwesome5, Feather, Octicons, FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

//ASLKDMASFMALGMLGSA

const ModalBook = ({ navigation, fullListing, user, fullTrilha, name }) => {

    const [listing, setListing] = useState([])
    const [trilha, setTrilha] = useState([])
    let listArray = []
    let trilhaArray = []

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    function colorThis() {
        fullListing.forEach((item) => {
            if(item.NomeTrilha == name){
                listArray.push(item);
            }
        })
        fullTrilha.forEach((item) => {
            if(item.NomeTrilha == name){
                trilhaArray.push(item);
            }
        })

        setListing(listArray)
        setTrilha(trilhaArray);
    }

    useEffect(() => {
        if (listing.length != 0 && user.ReceitasFeitas != undefined && user.ReceitasFeitas != {} && user.ReceitasFeitas != "" && user.ReceitasFeitas != null) {
            try { colorThis(); console.log("colored"); } catch (error) { console.log(error) }
        }
    }, [listing, user])

    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={listing}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemcontainer} >
                        <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => navigation.navigate('Preparo', { paramKey: [item.Nome, trilha.Cor, item.Icone, trilha.CorBorda, trilha.CorFill] })}>
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
                    </View>

                )}
            />
        </SafeAreaView>
    )


}

export default ModalBook

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
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    buttontitle: {
        color: "#505050"
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
    icon: {
        width: 65,
        height: 65,
        alignSelf: 'center',
        paddingVertical: 20
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