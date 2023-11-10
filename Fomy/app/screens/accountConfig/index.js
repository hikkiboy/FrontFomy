import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from "react-native"
import { useLayoutEffect } from "react"
import Feather from 'react-native-vector-icons/Feather'


export default function Preferences ({navigation}){

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <View style={{ height: 60, paddingTop: 30, backgroundColor: "rgba(0,0,0,0.2)" }} >
                    <View style={{ height: 50, backgroundColor: "#FFF" }} >
                        <TouchableOpacity onPress={() => navigation.navigate("Config")}><Feather name="chevron-right" size={28} /></TouchableOpacity>
                    </View>
                </View>
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
    
    return(
    <SafeAreaView style={styles.container} >


        <View style={styles.content} >
            <Text style={styles.title} >Conta</Text>
            <View style={styles.configlist} >
                <TouchableOpacity style={styles.optionbutton} onPress={ () => navigation.navigate("AlterPassword")} activeOpacity={0.8} >
                    <Text style={styles.option} >Mudar Senha</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionbutton} onPress={ () => navigation.navigate("AlterEmail")} activeOpacity={0.8} >
                    <Text style={styles.option} >Mudar E-mail</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Verificação 2 Etapas</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
            </View>


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



