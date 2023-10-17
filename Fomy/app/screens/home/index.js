import {View, Button, FlatList, TouchableOpacity,StyleSheet, Dimensions} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'
import {Canvas, Circle, Group, LinearGradient, vec, RoundedRect, useImage, Image,Shadow, Text,useFont} from "@shopify/react-native-skia";
import { SafeAreaView } from 'react-native-safe-area-context'

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


const Alberto = useImage(require('../../assets/alberto.png'));
const fontSize = 32;
  const font = useFont(require('../../assets/Roboto-Bold.ttf'), fontSize);

return (
    <>
       <Canvas style={{ flex: 1 }}>
    <RoundedRect   
    x={50}
      y={200}
      width={256}
      height={256}
      r={25}
      color="lightblue">
    <Shadow dx={12} dy={12} blur={0} color="#93b8c4" />
      </RoundedRect>
    <Text
    x={100}
    y={350}
    text="Os Basicos"
    font = {font}
    
    />
   

    {Alberto && (
        <Image
        image={Alberto}
        fit="contain"
        x={150}
        y={250}
        width={64}
        height={64}
        />
    )}
  </Canvas>
      <Button title="teste" onPress={() => navigation.navigate(Receitas[0].NomeTrilha)} />
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    }
})

export default Home