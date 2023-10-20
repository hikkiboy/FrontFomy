import {View,StyleSheet} from 'react-native'
import {  app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot} from 'firebase/firestore'
import { useEffect, useState,useRef} from 'react'
import Animated from 'react-native-reanimated'
import auth from '@react-native-firebase/auth'
import OnboardingItem from '../../components/Onboarding'
import paginator from '../../components/paginator'
const Home = ({navigation}) => {

 

    const [Receitas, setReceitas] = useState([]);


    

useEffect(()=>{
    const receitaRef = collection(app_DB, 'Trilhas')

    const subscriver = onSnapshot(receitaRef, {
        next : (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc =>{
                console.log(doc.data())
                receitas.push({
                    key : doc.id,
                    ...doc.data()
                })
            })
            setReceitas(receitas)
            console.log(receitas)
            console.log(Receitas)

        }
    })

    return() => subscriver()

},[])




return (
    <View style={styles.container}>
      <Animated.FlatList data={Receitas} renderItem={({item, index}) => {
        return <OnboardingItem/>
      }}/>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    botao: {
      backgroundColor: "#7EB77F",
      alignSelf: "center",
      fontSize: 20,
      fontWeight: "bold",
      padding: 13,
      paddingLeft: 40,
      paddingRight: 40,
      borderColor: "black",
      borderWidth: 3,
      marginTop: 20,
      marginBottom: 200,
      borderRadius: 10,
      width: 250,
    },
    textStyle: {
      fontWeight: 'bold',
  fontSize: 18,
  textAlign: 'center'
    }

})

export default Home