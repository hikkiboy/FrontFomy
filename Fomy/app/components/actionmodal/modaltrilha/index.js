import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Button } from "react-native-elements"
import { Route } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy, documentId } from "firebase/firestore";
import { MaterialCommunityIcons, FontAwesome, FontAwesome6 } from "react-native-vector-icons"


export function ModalTrilha({ handleAction, data, navigation, cor, bg, setBg, borderColor, Fill, userRecipes, description }) {

    console.log(description);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={() => { setTimeout(() => { setBg() }, 100); setTimeout(() => { handleAction() }, 120) }} ></TouchableOpacity>

            <View style={styles.content} >
                <View style={styles.title} >
                    <Text allowFontScaling={false} style={styles.titletext} >{data.Nome}</Text>
                    <Image style={styles.linha} source={require("../../../assets/lines-detail.png")} />
                </View>
                <View style={styles.blwtitle} >
                    <View style={styles.iconarea} >
                        <Image style={styles.icon} source={{ uri: data.Icone }} />
                    </View>
                    <View style={styles.stats} >
                        <View style={styles.statarea} >
                            <View style={styles.iconcontainer} >
                                <FontAwesome6 color={"#FAB151"} name="piggy-bank" size={30} />
                            </View>
                            <Text allowFontScaling={false} style={styles.textostats}>+{data.Moedas}</Text>
                        </View>
                        <View style={styles.statarea} >
                            <View style={[styles.iconcontainer, {paddingTop: 2}]} >
                                <FontAwesome color={"#70D872"} name="plus" size={33} />
                            </View>
                            <Text allowFontScaling={false} style={[styles.textostats, {paddingBottom: 2}]}>{data.Exp} exp</Text>
                        </View>
                        <View style={[styles.statarea, { marginTop: 10 }]} >
                            <View style={styles.iconcontainer} >
                                <MaterialCommunityIcons color={"#3B98EF"} name="clock" size={30} />
                            </View>
                            <Text allowFontScaling={false} style={styles.textostats}>{data.Tempo} min</Text>
                        </View>
                    </View>
                </View>
                <View style={[{ marginTop: 15, backgroundColor: borderColor, width: '100%', borderRadius: 15, zIndex: 4, marginBottom: 2 }]} >
                    <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: Fill, position: 'absolute', borderRadius: 15, marginTop: 2 }]} />

                    <TouchableOpacity style={[{
                        backgroundColor: cor,
                        paddingVertical: 5,
                        borderRadius: 15,
                        borderWidth: 4,
                        borderColor: Fill,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                    }]}
                        onPress={() => { setBg(); setTimeout(() => { handleAction(); navigation.navigate('Preparo', { paramKey: [data.Nome, cor, data.Icone, borderColor, Fill], user: [userRecipes], origin: ["Trilha"], description: [description] }) }, 1) }}
                        activeOpacity={0.8}
                    >
                        <Text allowFontScaling={false} style={styles.buttonsee} >Ver receita</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    content: {
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 35,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    buttonsee: {
        color: "#FFF",
        fontSize: 25,
        fontFamily: "FredokaSemibold",

    },
    action: {
        fontSize: 20,
        fontFamily: "FredokaSemibold",
    },
    title: {
        alignItems: 'center',
        marginBottom: 15
    },
    titletext: {
        fontSize: 27,
        marginBottom: 7,
        fontFamily: "FredokaBold",
        color: "#303030"
    },
    linha: {
        width: 205.5,
        height: 7.5,
        marginTop: 8,
        resizeMode: 'stretch'

    },
    stats: {
    },
    blwtitle: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '98%',
        paddingHorizontal: '5%',
        marginBottom: 15
    },
    icon: {
        width: 110,
        height: 110,
    },
    statarea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 12
    },
    iconcontainer: {
        width: 35,
        alignItems: 'center',
        marginRight: 15
    },
    clock: {
        marginLeft: 0.5,
        marginRight: 11
    },
    textostats: {
        fontFamily: "FredokaSemibold",
        fontSize: 25,
        color: "#505050"
    }




})