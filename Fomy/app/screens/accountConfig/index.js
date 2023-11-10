import { View, Text, TouchableOpacity, StyleSheet} from "react-native"
import { useLayoutEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Feather from 'react-native-vector-icons/Feather'


export default function Preferences ({navigation}){

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex', marginBottom: 54 }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.10)" }} >
                        <View style={{width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity style={{ width: "8.5%", marginStart: 10 }} onPress={() => navigation.goBack()} ><Feather name="chevron-left" size={28} /></TouchableOpacity>
                            <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                                <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center', position: 'absolute' }} >Conta</Text>
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
    
    return(
    <SafeAreaView style={styles.container} >


        <View style={styles.content} >
            <Text style={styles.title} >Segurança</Text>
            <View style={styles.configlist} >
                <TouchableOpacity style={styles.optionbutton} onPress={ () => navigation.navigate("AlterPassword")} activeOpacity={0.8} >
                    <Text style={styles.option} >Alterar Senha</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionbutton} onPress={ () => navigation.navigate("AlterEmail")} activeOpacity={0.8} >
                    <Text style={styles.option} >Alterar E-mail</Text>
                    <Feather name="chevron-right" size={28} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} >
                    <Text style={styles.option} >Verificação de 2 Etapas</Text>
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
    marginBottom: 7,
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



