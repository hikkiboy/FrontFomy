import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native'

const Community = ({navigation}) => {

    return(

        <SafeAreaView>
    
            <View style={styles.placeholder}>
                <Image  style={styles.engiberto} source={require('../../assets/anengiberto.png')}/>
                <Text style={styles.textoTemporario}>Feature em Desenvolvimento</Text>
            </View>
            
        </SafeAreaView>    
    )
    
}

export default Community

const styles = StyleSheet.create({

    placeholder:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 200,

    },
    engiberto:{
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    textoTemporario:{        
        fontSize: 27,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: -10
        
    }
})