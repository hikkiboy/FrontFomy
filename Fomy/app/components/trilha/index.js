import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, useWindowDimensions, TouchableOpacity } from 'react-native';
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Route } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleOnCloseModal = () => {
    setSelectedItem(null);
  };

  
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
  

  export default function Trilha({route, props, navigation}) {
  return (
    <SafeAreaView style={styles.container} >
      
      <View style={{backgroundColor: route.params.paramKey[2],marginTop: 14, width: 378, height: 219, borderRadius:15 }}>
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
    backgroundColor: "#EFEFEF"
  },
  row:{
    flexDirection: 'row', 
    alignContent: 'flex-end', 
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    maxHeight: 200


  },
  rightRow:{
    width: '70%',
    height: '100%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    zIndex: 3,
    backgroundColor:'#FFF'

  },
  detail:{
    width: 137,
    height: 5,
    marginTop: 8
  },
  buttonsee:{
    color: "rgba(0,0,0,0.6)",
    fontSize: 20,
    fontWeight: 'bold',

  },
  //fazer fonte depois
  trilhaTit:{
    textAlign: 'center',
    height: 70,
    fontSize: 42,
    fontWeight: "700",
    color: "black",

  
    
    //fontFamily: FontFamily.leagueSpartanBold
  },
  textoTrilha:{
    alignSelf: 'center',
    fontSize: 22.5,
    fontWeight: "400",
    color: "black",
    textAlign: 'center',
    opacity: 0.6,
    marginLeft: 50,
    marginRight: 50,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -20

  },
  linha:{
    alignSelf: 'center',
    alignItems: 'center',
    height: 97.2,
    width: '100%',
    marginVertical: '4%'
    
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
    color: "#000",
    marginTop: 8,
    textAlign: 'center',
    width: '80%'
  },
  textoFase:{
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: '700',
    color: "rgba(0,0,0,0.6)",
    position: 'absolute'
  },
  descricaoReceita:{
    alignSelf :'center',
    position: 'absolute',
    flex: 1,
    paddingLeft: 100
  },
  modalContain: {
    width: "80%",
    height: "20%",
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center'
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


