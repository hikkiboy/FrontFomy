import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList } from 'react-native';
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Route } from '@react-navigation/native';

export default function Trilha({route}) {
  const [Receitas, setReceitas] = useState([]);

  

    console.log(route.params.paramKey)
  useEffect(()=>{
    
    const receitaRef = collection(app_DB, 'Receitas')
    
    const q = query(
      receitaRef,
      where('NomeTrilha', '==', route.params.paramKey),
      
      orderBy('Posicao', 'asc')
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
  


  return (
    <SafeAreaView >
      
      <View style={{backgroundColor: "#7eb77f",marginTop: 14, width: 378, height: 219, borderRadius:15 }}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image style={{width:109, height:109, marginTop: 18}} source={require('../../assets/fogao.png')}/>
        <Image  style={{width:108, height:139}} source={require('../../assets/alberto.png')}/>
        <StatusBar style="auto" />
        </View>
          <Text style={styles.trilhaTit}>{route.params.paramKey[0]}</Text>
          <Text style={styles.textoTrilha}>{route.params.paramKey[1]}</Text>
        </View>

   
      {/* <View style={styles.linha}></View> */}
{/* fazer um flat list pra gerar as fases  */}
      
      <FlatList

      data={Receitas}
      
      scrollEnabled = {true}
      showsVerticalScrollIndicator ={false}
      renderItem={({item}) => (
        <View style={styles.fase}>
        <Text style={styles.textoFase}>{item.Posicao}</Text>
        <Text>{item.Descricao}</Text>
        <View style={styles.linha}></View>
      </View>
      )}
      />
       </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //fazer fonte depois
  trilhaTit:{
    textAlign: 'center',
    height: 70,
    fontSize: 42,
    fontWeight: "700",
    color: "#365336",
    //fontFamily: FontFamily.leagueSpartanBold
  },
  textoTrilha:{
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#365336",
  },
  linha:{
    height: 77,
    width: 2,
    borderRightWidth: 2,
    color: "red"
  },
  fase:{
    backgroundColor: "#7eb77f",
    width: 112,
    height: 88,
    borderRadius: 15,
    textAlign: "center",
    marginTop: 50,
    marginLeft: 15,
  },
  textoFase:{
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: "700",
    color: "#365336",
  }

});

// function nomeCompleto(){
//  nomeComplet0 = nome+sobrenome
// }

// export const nomeCompletos = () =>{
//   nomeCompletos = nome+sobrenome
// }

// const nomeComplet0s = (()=> {

// })

// const nomeCompl3tos = {
//   nomeCompletos: (() => nomeCompletos = nome+sobrenome),
//   somar:(()=> 1+1)
// }

// nomeCompl3tos.somar()


