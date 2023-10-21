import { center } from "@shopify/react-native-skia"
import { View, StyleSheet, Image, Text } from "react-native"

export function LoadProfile({ data }){

    return(
        <View>
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
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    pfp:{
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    bgpfp:{
        height: '75%',
        backgroundColor: "#7EB77F",
        alignItems: 'center',
        paddingBottom: 40
    },
    brdrpfp:{
        width: 220,
        height: 220,
        borderRadius: 150,
        borderWidth: 10,
        marginBottom:-100,
        borderColor: 'white',
        backgroundColor: "#D9D9D9",
        marginTop: 60,
    },
    name:{
        alignSelf: 'center',
        fontSize: 50,
        marginTop:-15
    },
    flag:{
        alignSelf: 'center',
        width: 255,
        height: 60,
        marginTop: 55
    },
    lvl:{
        alignSelf: 'center',
        fontSize: 40,
        position:"absolute",
        marginTop: 50,
        fontWeight: '700'

    }

})