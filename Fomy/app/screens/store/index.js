import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native'

const Store = ({navigation}) => {

return(

    <SafeAreaView>

        <View>
            <Image style={styles.placeholder} source={require('../../assets/cssource.png')}/>
        </View>
        
    </SafeAreaView>    
)

}

export default Store

const styles = StyleSheet.create({

    placeholder:{
        width: '100%', 
        height: '100%'
    }
})