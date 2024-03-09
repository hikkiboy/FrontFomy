import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native"
import { useLayoutEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather, FontAwesome } from 'react-native-vector-icons'


export default function Preferences ({navigation}){

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex' }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 10 }} >
                        <View style={{width: "100%", height: 55, backgroundColor: "#FFF", flexDirection: 'row', alignItems: 'center', borderRadius: 10 }} >
                            <TouchableOpacity style={{ width: "8.5%", marginStart: 20 }} onPress={() => navigation.goBack()} ><FontAwesome size={25} color={"#303030"} name='arrow-left' /></TouchableOpacity>
                            <View style={{ alignSelf: 'center', justifyContent: 'center', width: "100%", position: 'absolute' }} >
                                <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center', position: 'absolute', color: "#303030" }} >Conta</Text>
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

        <ScrollView style={{ minWidth: "100%", minHeight: "100%", marginTop: 50 }} >
            <View style={styles.content} >
                <Text style={styles.title} >Segurança</Text>
                <View style={styles.configlist} >
                    <TouchableOpacity style={styles.optionbutton} onPress={ () => navigation.navigate("AlterPassword")} activeOpacity={0.8} >
                        <Text style={styles.option} >Alterar Senha</Text>
                        <Feather name="chevron-right" size={28} color={"#505050"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionbutton} onPress={ () => navigation.navigate("AlterEmail")} activeOpacity={0.8} >
                        <Text style={styles.option} >Alterar E-mail</Text>
                        <Feather  name="chevron-right" size={28} color={"#505050"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lastoptionbutton} activeOpacity={0.8} >
                        <Text style={styles.option} >Verificação de 2 Etapas</Text>
                        <Feather name="chevron-right" size={28} color={"#505050"} />
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: "#FFFFFF",

},
content:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
},
title:{
    marginStart: 7,
    marginEnd: 7,
    marginBottom: 7,
    fontSize: 24,
    fontWeight: 'bold',
    color: "#303030"
},
configlist:{
    marginStart: 5,
    marginEnd: 5,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "rgba(0,0,0,0.18)",
    marginBottom: 25


},
optionbutton:{
    borderBottomWidth: 3,
    borderColor: "rgba(0,0,0,0.18)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
option:{
    fontWeight: 'bold',
    fontSize: 18,
    color: "#505050"
},
lastoptionbutton:{
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

}

})



