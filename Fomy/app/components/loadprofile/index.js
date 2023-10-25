import { center } from "@shopify/react-native-skia"
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { Overlay } from "react-native-elements"
import { useState } from "react"

export function LoadProfile({ data }){

    const [visible, setVisible] = useState(false)

    function toggleOverlay(){
        setVisible(true);
    };
    function closeOverlay(){
        setVisible(false);
    }


    return(
        <View>
            <View style={styles.bgpfp} >
            <TouchableOpacity onPress={toggleOverlay} >
                <Ionicons style={styles.gear} name="settings-sharp" size={35} color="#000"/>
            </TouchableOpacity>
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
                    <Text style={styles.title} >{data.Titulo}</Text>
                </View>
            </View>

            <Overlay isVisible={visible} onBackdropPress={closeOverlay} >
                <Text>oiiiii</Text>
            </Overlay>
            
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
        paddingStart: 130,
        paddingTop: 10

    }

})