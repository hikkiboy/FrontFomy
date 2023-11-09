import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native"
import { app_auth } from '../../../firebaseConfig'
import { useLayoutEffect } from "react"
import Feather from 'react-native-vector-icons/Feather'


export default function Configs ({navigation}){

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: "",
            headerRight: () => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', width: "92%", alignSelf: 'center', textAlign: 'center', color: "black", zIndex: 1}} >Configurações</Text>
            ),
            headerLeft: () => (
                <Pressable style={{ zIndex: 99 }} onPress={() => {navigation.goBack()}} ><Feather name="chevron-left" size={32} color={"black"} /></Pressable>
            )
        })
    }, [navigation])
    
    return(
    <SafeAreaView style={styles.container} >


        <View style={styles.content} >
            <Text style={styles.title} >Conta</Text>
            <View style={styles.configlist} >
                <TouchableOpacity style={styles.optionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Preferências</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Notificações</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Privacidade</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
            </View>

            <Text style={styles.title} >Premium</Text>
            <View style={styles.configlist} >
                <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Assinatura</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
            </View>

            <Text style={styles.title} >Suporte</Text>
            <View style={styles.configlist} >
                <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Atendimento</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.delete} onPress={ () => navigation.navigate("DeleteAccount")} activeOpacity={0.9} >
                <Text style={styles.action} >Deletar Conta</Text>
            </TouchableOpacity>


            </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: "#EFEFEF"

},
content:{
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
    paddingBottom: 35,
    shadowColor: "#000",
},
title:{
    marginStart: 7,
    marginEnd: 7,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold'
},
configlist:{
    marginStart: 5,
    marginEnd: 5,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "rgba(0,0,0,0.25)",
    marginBottom: 25


},
optionbutton:{
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,0.25)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
option:{
    fontWeight: 'bold',
    fontSize: 18
},
lastoptionbutton:{
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

},
action:{
    fontSize: 18,
    fontWeight: '600'
},
delete:{
    zIndex: 99,
    backgroundColor: "#DC6A87",
    borderRadius: 15,
    marginTop: 20,
    marginStart: 5,
    marginEnd: 5,
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#95233F",
    width: "98%"
}

})



