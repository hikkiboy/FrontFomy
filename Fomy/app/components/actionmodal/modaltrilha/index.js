import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Button } from "react-native-elements"
import { Route } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy,documentId } from "firebase/firestore";
import { Feather } from "react-native-vector-icons"

 



export function ModalTrilha({ handleAction, data, navigation, cor }){
    console.log(data)

    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={styles.content} >
                <View style={styles.title} >
                    <Text style={styles.titletext} >{data.Nome}</Text>
                    <Image style={styles.linha} source={require("../../../assets/lines-detail.png")} />
                </View>
                <View style={styles.blwtitle} >
                    <View style={styles.iconarea} >
                        <Image style={styles.icon} tintColor={cor} source={{uri : data.Icone}}/>
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
                            <Feather style={styles.clock} color={"#6EACEF"} name="clock" size={25} />
                            <Text style={styles.textostats}>{data.Tempo} min</Text>
                        </View>
                    </View>
                </View>
                <View style={[{ marginTop: 20, backgroundColor: cor, width: '98%', height: 47, borderRadius: 15, zIndex: 4, alignSelf: 'center' }]} >
                 
                   <TouchableOpacity style={[{
                        backgroundColor: cor,
                        height: '90%',
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                        borderColor: "rgba(0,0,0,0.01)", 
                        borderWidth: 4
                        }]}  
                        onPress={ () => navigation.navigate('Preparo',{paramKey:[data.Nome]})}
                    >
                        <Text style={styles.buttonsee} >Ver receita</Text>
                    </TouchableOpacity>
                    <View style={[{ backgroundColor: 'rgba(0,0,0,0.15)', height: '100%', width: '100%', position: 'absolute', borderRadius: 15, zIndex: 4 }]} ></View>
                </View>
            </View>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'

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
      color: "rgba(0,0,0,0.6)",
      fontSize: 22,
      fontWeight: 'bold'
  
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
        width:105, 
        height:104.5,
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