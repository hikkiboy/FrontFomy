import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native'

const Community = ({navigation}) => {

return(

    <SafeAreaView>

        <View>
            <Image style={styles.placeholder} source={require('../../assets/cssource.png')}/>
        </View>
        
    </SafeAreaView>    
)

}

export default Community

const styles = StyleSheet.create({

    placeholder:{
        width: '100%', 
        height: '100%'
    }
})