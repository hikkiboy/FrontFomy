import { View, StyleSheet, Image, Text, TouchableOpacity, Modal } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"
import { ActionModal } from "../actionmodal"
import { Input } from "react-native-elements"

export function LoadProfile({ data, navigation }){

    const [visible, setVisible] = useState(false)
    const [inputOn, setInputOn] = useState(true)

    const handleModal = () => {
        setVisible(!visible);
    }

    const handleInput = () => {
        setInputOn(!visible);
    }

    var visibleInput = null
    if(inputOn){
            visibleInput = (<Input placeholder="Digite o nome" style={styles.nameinput} ></Input>);
    }

    return(
        <View>
            <TouchableOpacity style={{ zIndex: 99 }} onPress={handleModal} >
                <Ionicons style={styles.gear} name="settings-sharp" size={35} color="#000"/>
            </TouchableOpacity>
            <View style={styles.bgpfp} >
                <View style={styles.brdrpfp} >
                    <Image
                        source={{ uri: data.Foto }}
                        style={styles.pfp}
                
                    />
                </View>
                <View>
                    <Image
                        source={require('../../assets/bandeira-nivel.png')}
                        style={styles.flag}
                    />
                    <Text style={styles.lvl} >Lv. {data.Nivel}</Text>
                    <Text style={styles.name} >{data.Nome}</Text>
                    {visibleInput}
                    <Text style={styles.title} >{data.Titulo}</Text>
                </View>
            </View>

            <Modal visible={visible}
            onRequestClose={handleModal} 
            animationType="slide"
            transparent={true}
            >
                <ActionModal
                    handleAction={handleModal}
                    navigation={navigation}
                    handleName={handleInput}
                
                />
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    pfp:{
        width: 175,
        height: 175,
        borderRadius: 100,
    },
    bgpfp:{
        height: '71.5%',
        backgroundColor: "#7EB77F",
        alignItems: 'center',
        paddingBottom: 40
    },
    brdrpfp:{
        width: 195,
        height: 195,
        borderRadius: 150,
        borderWidth: 10,
        marginBottom:-100,
        borderColor: "#EFEFEF",
        backgroundColor: 'white',
        marginTop: 35
    },
    name:{
        alignSelf: 'center',
        fontSize: 29,
        marginTop:10,
        fontWeight: 'bold'
    },
    nameinput:{
        backgroundColor: "#7EB77F",
        width: 200,
        position: "absolute",
        borderRadius: 15,
        textAlign: 'center',
        alignSelf: 'flex-end'
    },
    title:{
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: "rgba(0,0,0,0.5)"
    },
    flag:{
        alignSelf: 'center',
        width: 208,
        height: 48,
        marginTop: 60
    },
    lvl:{
        alignSelf: 'center',
        fontSize: 27,
        position:"absolute",
        marginTop: 60,
        fontWeight: '700'

    },
    gear:{
        position: "absolute",
        alignSelf: 'flex-end',
        padding: 10

    }

})