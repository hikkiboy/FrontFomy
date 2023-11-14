import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId, collectionGroup } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';
import { center } from '@shopify/react-native-skia';
import { Feather } from 'react-native-vector-icons'


export default function Passos({route, props, navigation}) {


  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)
  const [Passo, setPasso] = useState([])
  const [calcula, setCalcula] = useState(1)

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
          //isso pode causar problemas quando a pessoa estiver fazendo e ocorrer uma atualização no banco de dados,
          //porque reiniciará a posição dela, talvez depois fazer uma outra variavel que define se isso carregou pela primeira vez
          setPasso(receitas[0])
        }
      })
      return() => subscriver()
      
  
  },[])

function pa(i, fwd){
  if(i < Receitas.length && fwd == true){
    i++;
    setCalcula(i);
    setPasso(Receitas[(i - 1)]);
    console.log("Valor: "+ i + "Valor2: "+calcula);

  } else if(i < Receitas.length && fwd == false){
    i--;
    setCalcula(i);
    setPasso(Receitas[(i - 1)]);
    console.log("Valor: "+ i + "Valor2: "+calcula);

  } else if( i - 1 == 0 && fwd == false ){
    navigation.goBack()
  } else{
    navigation.navigate("Parabens")
  }
}
console.log("Passo: ",Passo)

  return (
       <SafeAreaView style={{marginTop: 30}}>
        <TouchableOpacity style={{ position: 'absolute', zIndex: 99 }} ><Feather name="chevron-left" color={"black"} size={40} /></TouchableOpacity>
        <ImageBackground style={{height: 250, zIndex: 0}} source={require('../../assets/Group171.png')}>
        <View style={styles.botaoPassos}>
          <Text style={styles.TituloPasso}> Passo {Passo.Sequencia}:  {Passo.Titulo}</Text>
          <Button onPress={ () => pa(calcula, true)}></Button>
          
          </View>
          <View style={styles.Video}>
          
          </View>
        </ImageBackground>
        <View>
        
        </View>
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


