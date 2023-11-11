import { StatusBar } from 'expo-status-bar';
import { Alert, Modal, Pressable, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, useWindowDimensions, TouchableOpacity } from 'react-native';
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Route } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

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

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <SafeAreaView style={styles.container} >
      <ScrollView style ={{ flexGrow: 1, paddingBottom: 300 }}>
        <View style={{backgroundColor: route.params.paramKey[2],marginTop: '10%', width: width - 20, height: 285, borderRadius:15, alignSelf: "center", marginBottom: 40, zIndex: 1 }}>
          <View style={[{ backgroundColor: route.params.paramKey[2], height: '96.3%', borderRadius: 15, zIndex: 2 }]} >
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <Image style={{width:109, height:109, marginTop: 30}} source={require('../../assets/fogao.png')}/>
              <Image  style={{width:108, height:139, marginTop:10}} source={require('../../assets/alberto.png')}/>
              <StatusBar style="auto" />
            </View>
            <Text style={styles.trilhaTit}>{route.params.paramKey[0]}</Text>
            <Text style={styles.textoTrilha}>{route.params.paramKey[1]}</Text>
          </View>
          <View style={[{ backgroundColor: 'rgba(0,0,0,0.15)', height: '100%', width: '100%', borderRadius: 15, zIndex: 1, position: 'absolute' }]} ></View>
            
        </View>

   
        {/* <View style={styles.linha}></View> */}
        {/* fazer um flat list pra gerar as fases  */}
        {/* INICIO DO MODAL */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>oia os paranaue</Text>
            <TouchableOpacity style={[{
                    backgroundColor:route.params.paramKey[2],
                    height: '83%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    }]}  
                    onPress={() => setModalVisible(!modalVisible)}
                  >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
        {/* FIM DO MODAL */}
      
        <FlatList
        data={Receitas}
        scrollEnabled = {false}
        showsVerticalScrollIndicator ={false}
        renderItem={({item}) => (
          <View style={styles.container} >
            <View style={styles.row} >
              <View style={{ height: '107%', width: '100%', zIndex: 1, backgroundColor: '#C9C9C9', position: 'absolute', borderRadius: 15 }} ></View>
              <View style={{ height: '107%', width: '30%', zIndex: 2, backgroundColor: 'rgba(0,0,0,0.15)', position: 'absolute', borderRadius: 15, borderBottomRightRadius: 0 }} ></View>
              <View style={[{ height: '107%', width: '30%', zIndex: 1, backgroundColor: route.params.paramKey[2], position: 'absolute', borderRadius: 15, borderBottomRightRadius: 0 }]} ></View>
              <View style={[{
                backgroundColor:route.params.paramKey[2],
                width: "30%",
                height: "100%",
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                justifyContent: 'center',
                zIndex: 3
                }]}
              >
                  <Text style={styles.textoFase}>{item.Posicao}</Text>

                  {/* USAR MODAL */}
              </View>
              <View style={styles.rightRow} >
                <Text style={styles.descricaoFase}>{item.Nome}</Text>
                <Image style={styles.detail} source={require("../../assets/lines-detail.png")} />
                <View style={[{ marginTop: 20, backgroundColor: route.params.paramKey[2], marginBottom: 15, width: '85%', height: 37, borderRadius: 15, zIndex: 4 }]} >
                 
                  <TouchableOpacity style={[{
                    backgroundColor:route.params.paramKey[2],
                    height: '83%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    }]}  
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.buttonsee} >Ver receita</Text>
                  </TouchableOpacity>
                  <View style={[{ backgroundColor: 'rgba(0,0,0,0.15)', height: '100%', width: '100%', position: 'absolute', borderRadius: 15, zIndex: 4 }]} ></View>
                </View>
              </View>
            </View>
            <View style={styles.linha}>
              <Image tintColor={route.params.paramKey[2]} style={{ height: 97.2, width: 19.2 }} source={require('../../assets/seta_default.png')} />
            </View>
            
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
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


