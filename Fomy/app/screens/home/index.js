import {View, FlatList,StyleSheet, Animated} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState,useRef} from 'react'
import auth from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import OnboardingItem from '../../components/Onboarding'
import paginator from '../../components/paginator'
import Paginator from '../../components/paginator'
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

const [currentIndex, setCurrentIndex] = useState(0)


const scrollX = useRef(new Animated.Value(0)).current
const slidesRef = useRef(null)

const viewableItemsChanged = useRef(({viewableItems})=> {
  setCurrentIndex(viewableItems[0].index)
}).current

const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

return (
  <View style ={{flex: 3}}>
  <FlatList
  data={Receitas}
  renderItem={({item}) => <OnboardingItem item={item}/>}
  horizontal
  showsHorizontalScrollIndicator = {false}
  pagingEnabled
  bounces={false}
  keyExtractor={item => item.key}
  onScroll={Animated.event([{nativeEvent: {contentOffset: {x : scrollX}}}],{
    useNativeDriver:false,
  })}
  scrollEventThrottle={32}
  onViewableItemsChanged={viewableItemsChanged}
  viewabilityConfig={viewConfig}
  ref ={slidesRef}
  />
  <Paginator data = {Receitas.length}/>
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