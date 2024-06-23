import { View, Text, TouchableOpacity, StyleSheet, useState, Modal, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export function ModalBadge({ checkBadge, data }){
    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => checkBadge()} style={{ zIndex: 99 }}>
                <View style={styles.backiconarea} >
                    <FontAwesome size={30} color={"#303030"} name='arrow-left' />
                </View>
            </TouchableOpacity>
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <Image style={{ resizeMode: 'contain', width: 165, height: 172.5 }} source={{ uri : data.Imagem }} />
                <Text style={styles.Titulo} >{data.Titulo}</Text>
                <Text style={styles.Descricao} >{data.Descricao}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    backiconarea:{
      padding: 7, 
      paddingHorizontal: 9, 
      position: 'absolute', 
      zIndex: 99, 
      top: 10, 
      left: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100
    },
    Titulo:{
        fontSize: 32,
        fontFamily: "FredokaSemibold",
        marginTop: 40,
        color: "#303030"
    },
    Descricao:{
        fontSize: 23,
        fontFamily: "FredokaMedium",
        marginTop: 30,
        textAlign: 'center',
        maxWidth: "80%",
        color: "#505050"
    }
})