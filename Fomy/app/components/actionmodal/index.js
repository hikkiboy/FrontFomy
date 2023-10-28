import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Button } from "react-native-elements"

export function ActionModal({ handleAction, navigation }){
    return(
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ flex: 1, zIndex: 9 }} onPress={handleAction} ></TouchableOpacity>

            <View style={styles.content} >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UploadMediaFile')} activeOpacity={0.9} >
                    <Text style={styles.action} >Mudar Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.9} >
                    <Text style={styles.action} >Mudar Fundo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.9} >
                    <Text style={styles.action} >Configurações</Text>
                </TouchableOpacity>

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
    button:{
        zIndex: 99,
        backgroundColor: "#7EB77F",
        borderRadius: 15,
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderBottomWidth: 6,
        borderColor: "#427643"
    },
    action:{
        fontSize: 18,
        fontWeight: '600'
    }

})