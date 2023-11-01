import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList } from 'react-native';
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Route } from '@react-navigation/native';

export default function Trilha({route}) {
  const [Receitas, setReceitas] = useState([]);

  
  const NomeTrilha = route.params.paramKey
    console.log(route.params.paramKey)
  useEffect(()=>{
    
    const receitaRef = collection(app_DB, 'Receitas')
    
    const q = query(
      receitaRef,
      where('NomeTrilha', '==', route.params.paramKey[0]),
      
      orderBy('Posicao', 'asc')
      )
      console.log(NomeTrilha)     
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
    <SafeAreaView style={styles.container} >
      
      <View style={{backgroundColor: route.params.paramKey[2],marginTop: '10%', width: 360, height: 270, borderRadius:15, alignSelf: "center" }}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image style={{width:109, height:109, marginTop: 30}} source={require('../../assets/fogao.png')}/>
        <Image  style={{width:108, height:139, marginTop:10}} source={require('../../assets/alberto.png')}/>
        <StatusBar style="auto" />
        </View>
          <Text style={styles.trilhaTit}>{route.params.paramKey[0]}</Text>
          
        </View>
        <Text style={styles.textoTrilha}>{route.params.paramKey[1]}</Text>

   
      {/* <View style={styles.linha}></View> */}
{/* fazer um flat list pra gerar as fases  */}
      
      <FlatList
      data={Receitas}

      scrollEnabled = {true}
      showsVerticalScrollIndicator ={false}
      renderItem={({item}) => (
        <View style={styles.container}>
        <View style={[{
          backgroundColor:route.params.paramKey[2],
          width: 112,
          height: 88,
          borderRadius: 15,
          textAlign: "center",
          marginTop: 50,
          marginLeft: 15,
        }]}>
        <Text style={styles.textoFase}>{item.Posicao}</Text>
        
        <View style={styles.linha}></View>
        </View>
  
      </View>
      )}
      />
       </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    
  },
  //fazer fonte depois
  trilhaTit:{
    textAlign: 'center',
    height: 70,
    fontSize: 42,
    fontWeight: "700",
    color: "black",
    marginBottom: 50


  
    
    //fontFamily: FontFamily.leagueSpartanBold
  },
  textoTrilha:{
    alignSelf: 'center',
     marginTop: -70,
    fontSize: 22.5,
    fontWeight: "400",
    color: "black",
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    opacity: 0.6,
    marginLeft: 50,
    marginRight: 50,
    alignSelf: 'center',

    

  },
  linha:{
    height: 40,
    width: 2,
    borderRightWidth: 2,
    color: "red",
    alignSelf: 'center',
    margin: 5,
    borderRadius: 25
  },
  fase:{
    
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
    fontWeight: '700',
    color: "#365336",
  },
  descricaoReceita:{
    alignSelf :'center',
    position: 'absolute',
    flex: 1,
    paddingLeft: 100
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


