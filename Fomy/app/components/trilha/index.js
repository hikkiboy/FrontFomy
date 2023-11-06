import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, useWindowDimensions } from 'react-native';
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

  const {width} = useWindowDimensions()


  return (
    <SafeAreaView style={styles.container} >
      <ScrollView style ={{ flexGrow: 1, paddingBottom: 300 }}>
        <View style={{backgroundColor: route.params.paramKey[2],marginTop: '10%', width: width - 20, height: 270, borderRadius:15, alignSelf: "center", marginBottom: 50 }}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Image style={{width:109, height:109, marginTop: 30}} source={require('../../assets/fogao.png')}/>
            <Image  style={{width:108, height:139, marginTop:10}} source={require('../../assets/alberto.png')}/>
            <StatusBar style="auto" />
          </View>
            <Text style={styles.trilhaTit}>{route.params.paramKey[0]}</Text>
            <Text style={styles.textoTrilha}>{route.params.paramKey[1]}</Text>
            
        </View>

   
      {/* <View style={styles.linha}></View> */}
{/* fazer um flat list pra gerar as fases  */}
      
        <FlatList
        data={Receitas}
        scrollEnabled = {false}
        showsVerticalScrollIndicator ={false}
        renderItem={({item}) => (
          <View>
            <View style={styles.row} >
              <View style={[{
                backgroundColor:route.params.paramKey[2],
                width: "30%",
                height: 98,
                borderRadius: 15
                }]}
              >
                  <Text style={styles.textoFase}>{item.Posicao}</Text>
              </View>
              <View style={styles.leftRow} >
                <Text style={styles.descricaoFase}>{item.Nome}</Text>
              </View>
            </View>
            <View style={styles.linha}></View>
          </View>
        )}
        />
      </ScrollView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#EFEFEF"
  },
  row:{
    flexDirection: 'row', 
    alignContent: 'center', 
    alignItems: 'center',
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: 'white',
    borderRadius: 15

  },
  leftRow:{
    width: '70%',
    height: '100%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center'

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
    opacity: 0.6,
    marginLeft: 50,
    marginRight: 50,
    alignSelf: 'center',
    marginBottom: 15
    

    

  },
  linha:{
    height: 75,
    width: 2,
    borderRightWidth: 2,
    marginStart: 67,
    margin: 5,
    borderRadius: 100,
    
  },
  fase:{
    
    width: 112,
    height: 88,
    borderRadius: 15,
    textAlign: "center",
    marginTop: 50,
    marginLeft: 15,
  },

  descricaoFase:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#365336",
    marginTop: 8
  },
  textoFase:{
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: '700',
    color: "rgba(0,0,0,0.5)"
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


