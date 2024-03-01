import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Button } from "react-native-elements"
import { Route } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy,documentId } from "firebase/firestore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"


export function ModalTrilha({ handleAction, data, navigation, cor, bg, setBg, borderColor, Fill }){

    return(
        <SafeAreaView style={[styles.container, {backgroundColor: bg}]} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={() => {setTimeout(() => {setBg()}, 100); setTimeout(() => {handleAction()}, 120)}} ></TouchableOpacity>

            <View style={styles.content} >
                <View style={styles.title} >
                    <Text style={styles.titletext} >{data.Nome}</Text>
                    <Image style={styles.linha} source={require("../../../assets/lines-detail.png")} />
                </View>
                <View style={styles.blwtitle} >
                    <View style={styles.iconarea} >
                        <Image style={styles.icon} source={{uri : data.Icone}}/>
                    </View>
                    <View style={styles.stats} >
                        <View style={styles.statarea} >
                            <Image style={styles.imagestats} source={require("../../../assets/coins.png")} />
                            <Text style={styles.textostats}>+{data.Moedas}</Text>
                        </View>
                        <View style={styles.statarea} >
                            <Image style={styles.imagestats} tintColor={cor} source={require("../../../assets/exp-up.png")} />
                            <Text style={styles.textostats}>+{data.Exp} Exp</Text>
                        </View>
                        <View style={styles.statarea} >
                            <FontAwesome5 style={styles.clock} color={"#6EACEF"} name="clock" size={25} />
                            <Text style={styles.textostats}>{data.Tempo} min</Text>
                        </View>
                    </View>
                </View>
                <View style={[{ marginTop: 15, backgroundColor: borderColor, width: '100%', borderRadius: 15, zIndex: 4, marginBottom: 2 }]} >
                    <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: Fill, position: 'absolute', borderRadius: 15, marginTop: 2 }]} />

                    <TouchableOpacity style={[{
                        backgroundColor:cor,
                        paddingVertical: 4,
                        borderRadius: 15,
                        borderWidth: 4,
                        borderColor: Fill,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                        }]}  
                        onPress={ () => {setBg(); setTimeout(() => {handleAction(); navigation.navigate('Preparo',{paramKey:[data.Nome, cor, data.Icone, borderColor, Fill]})}, 1)}}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonsee} >Ver receita</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1

    },
    content:{
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 35,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    buttonsee:{
      color: "#FFF",
      fontSize: 23,
      fontWeight: 'bold',
  
    },
    action:{
        fontSize: 18,
        fontWeight: '600'
    },
    title:{
        alignItems: 'center',
        marginBottom: 15
    },
    titletext:{
        fontSize: 25,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    linha:{
        width: 205.5,
        height: 7.5,
        marginTop: 8
      
    },
    stats:{
    },
    blwtitle:{
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '98%',
        paddingHorizontal: '5%',
        marginBottom: 15
    },
    icon:{
        width: 105, 
        height: 105,
    },
    statarea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    imagestats:{
        height: 26,
        width: 26,
        marginRight: 10
    },
    clock:{
        marginLeft: 0.5,
        marginRight: 11
    },
    textostats:{
        fontWeight: 'bold',
        fontSize: 25,
    }
    
    


})