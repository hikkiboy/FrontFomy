import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId, collectionGroup } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';
import { center } from '@shopify/react-native-skia';


export default function Passos({route, props, navigation}) {


  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleOnCloseModal = () => {
    setSelectedItem(null);
  };

  const key = route.params.paramKey
  
//   const NomeTrilha = route.params.paramKey
//     console.log(route.params.paramKey)
  useEffect(()=>{
    
    const receitaRef = collection(app_DB,`Receitas/${key}/Passos`)
    
    const q = query(
    receitaRef,
    // where("Nome", "==", "Massa de Bolo Simples de Ló") 
    )
      const subscriver = onSnapshot(q, {
        next : (snapshot) => {
          const receitas = []
          snapshot.docs.forEach(doc =>{
            receitas.push({
              key : doc.id,
              ...doc.data(),
            })
          })
          setReceitas(receitas)
        }
      })
      return() => subscriver()
      
  
  },[])

// console.log(Receitas[0].Sequencia)
let arr = []
arr.push(Receitas[0])
const x = () => {
  arr.shift()
}
console.log(arr)
  return (
       <SafeAreaView style={{marginTop: 30}}>
        <ImageBackground style={{height: 250}} source={require('../../assets/Group171.png')}>
        <View style={styles.botaoPassos}>
        <FlatList
            data={arr}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View>
                  <Button onPress={() => x()}/> 
                  <Button onPress={() => arr.push(Receitas[1])}/> 
                    <Text style={styles.TituloPasso}>Passo {item.key}: {item.Titulo}</Text>

                </View>
            )}
            />
          {/* <Text style={styles.TituloPasso}> Passo 1: {Receitas[0].Titulo}</Text> */}
          </View>
          <View style={styles.Video}>

          </View>
        </ImageBackground>
        <ImageBackground style={{height: '50%', width: '50%', alignSelf: 'center'}} source={require('../../assets/balaoDialogo.png')}>
        <FlatList
            data={Receitas}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View>
                  <Button onPress={() => console.log(item)}/>
                    <Text style={styles.DescPasso}>Passo {item.key}: {item.Passo}</Text>
                </View>
            )}
            />
        </ImageBackground>
       </SafeAreaView>  
      )} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    
  },
  botaoPassos:{
    width: '90%',
    height:30,
    borderWidth: 1, 
    borderRadius: 20,
    backgroundColor: '#5D875D',
    alignSelf: 'center',
    marginTop: '30%'
  },
  TituloPasso:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  Video:{
    backgroundColor: 'black',
    height: 200,
    width: 300,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20
  },
  DescPasso:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000'
  }
 

});


