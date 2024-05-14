import { View, Image, StyleSheet, Text,ScrollView,Button, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, FieldValue,arrayUnion,updateDoc, doc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import  AlbertoCustom  from '../../components/customalberto'


export default function Store ({navigation}){

  const [itens, setItens] = useState()
  const [user,setUser] = useState()


    useEffect(() => {

        const receitaRef = collection(app_DB, 'Itens')
        
        const q = query(
          receitaRef,
          
        )
        const subscriver = onSnapshot(q, {
          next: (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc => {
              receitas.push({
                key: doc.id,
                ...doc.data(),
                
              })
            })
            setItens(receitas)
            
            //console.log(itens)
            
          }
        })
        
        return () => subscriver()
        
      }, [])
      
      //função que cuida de dar update nas moedas e array de itens 
      async function UpdateArray(img, index){
        let moedas = await user[0].Moedas
        let preco = await itens[index].Valor
        const userRef = doc(app_DB, 'Usuarios', app_auth.currentUser.uid)
        
        console.log(!user[0].Itens.find((element) => element == img))
        
        
        if (moedas >= preco && !user[0].Itens.find((element)=> element == img)) {
          await updateDoc(userRef, {
            Itens: arrayUnion(img),
            Moedas : moedas - preco
          })
        }
        else{
          console.log("nah")
        }
      }

      useEffect(() => {

        const receitaRef = collection(app_DB, 'Usuarios')
    
        const q = query(
          receitaRef,
          where(documentId(), '==', app_auth.currentUser.uid),
    
        )
        const subscriver = onSnapshot(q, {
          next: (snapshot) => {
            const receitas = []
            snapshot.docs.forEach(doc => {
              receitas.push({
                key: doc.id,
                ...doc.data(),
    
              })
            })
            setUser(receitas)
    
    
          }
        })
    
        return () => subscriver()
    
    
    
      }, [])


//console.log(user)


    return(

        <SafeAreaView>

            <View style={styles.placeholder}>
            <FlatList
                data={itens}
                scrollEnabled
                renderItem={({item, index}) => (
                  <SafeAreaView>
                    <Button title= {item.NomeItem} onPress={() => UpdateArray(item.key, index)}></Button>
                    <Button title= "debug" onPress={() => console.log(item)}></Button>
                    <Button title= "Closet" onPress={() => navigation.navigate('Closet', {user:[user[0].Itens]}) }></Button>
                    <View>
                    <Image style={styles.image} resizeMode='center' source={{uri: item.Imagem}}/>
                    <Text>Moedas: {user[0].Moedas}</Text>
                    </View>
                  </SafeAreaView>
  )}
  />
          
            </View>
            
        </SafeAreaView>    
    )
    
}




const styles = StyleSheet.create({

    placeholder:{

    },
    image:{
      width: 150,
      height: 150,
    }
})