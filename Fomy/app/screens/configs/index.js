import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { app_auth } from '../../../firebaseConfig'


export default function Configs ({navigation}){
    
    return(
    <SafeAreaView>


        <View style={styles.content} >
            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate("Profile")} activeOpacity={0.9} >
                <Text style={styles.action} >Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.leave} onPress={ () => navigation.navigate("DeleteAccount")} activeOpacity={0.9} >
                <Text style={styles.action} >Deletar Conta</Text>
            </TouchableOpacity>


            </View>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
container:{
    flex:1

},
content:{
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
    paddingBottom: 35,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
    shadowColor: "#000",
},
button:{
    zIndex: 99,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#7EB77F"
},
action:{
    fontSize: 18,
    fontWeight: '600'
},
leave:{
    zIndex: 99,
    backgroundColor: "#DC6A87",
    borderRadius: 15,
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: "#95233F"
}

})



