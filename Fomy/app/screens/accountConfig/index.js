import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native"
import { useLayoutEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Feather from 'react-native-vector-icons/Feather'


export default function Preferences ({navigation}){

    useLayoutEffect(() =>{
        navigation.setOptions({
            header: () => (
                <SafeAreaView style={{ flex: 1, display: 'flex' }} >
                    <View style={{ width: "100%", height: 65, backgroundColor: "rgba(0,0,0,0.18)" }} >
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

        <ScrollView>
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
        </ScrollView>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: "#FFFFFF"

},
content:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
    marginTop: 40,
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
    fontSize: 18
},
lastoptionbutton:{
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

}

})



