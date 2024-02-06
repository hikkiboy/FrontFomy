import { StatusBar } from 'expo-status-bar';
import { Platform, Alert, Modal, Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList, useWindowDimensions, TouchableOpacity} from 'react-native';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Route } from '@react-navigation/native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import { ModalTrilha } from '../actionmodal/modaltrilha';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 



export default  function Trilha({ route, navigation }) {
  const [Receitas, setReceitas] = useState([]);
  const [modal, setModal] = useState([])
  const [onde, setOnde] = useState()
  const [bg, setBg] = useState();

  

  
  const NomeTrilha = route.params.paramKey
    //console.log(route.params.paramKey)
  useEffect(()=>{
    
    const receitaRef = collection(app_DB, 'Receitas')
    
    const q = query(
      receitaRef,
      where('NomeTrilha', '==', route.params.paramKey[0]),
      
      orderBy('Posicao', 'asc')
      )
      //console.log(NomeTrilha)     
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
  useEffect(()=>{
    
    const receitaRef = collection(app_DB, 'Usuarios')
    
    const q = query(
      receitaRef,
      where(documentId(), '==', app_auth.currentUser.uid),
      
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
          setOnde(receitas)


          
        }
      })
      
      return() => subscriver()
      

  
  },[])

  const {width} = useWindowDimensions()
  


  const [visible, setVisible] = useState(false)

  const handleModal = (item) => {
    if(visible == false){
      setVisible(!visible);
      if(Platform.OS === 'ios'){
        setTimeout(() => {
          setBg("rgba(0,0,0,0.1)");
        }, 300)
      }
    } else {
      setBg();
      setVisible(!visible);
    }
    setModal(item)
}

function handleTrilha (){
  try {
    if (route?.params.paramKey[0] == "Refeições"){
      setOnde(onde[0].Refeições)
      //console.log(onde)
    }
    else if(route?.params.paramKey[0] == "Basico"){
      setOnde(onde[0].Basico)
      //console.log(onde)
    }
    else if(route?.params.paramKey[0] == "Doces"){
      setOnde(onde[0].Doces)
      //console.log(onde)
    }
    else if(route?.params.paramKey[0] == "Gourmet"){
      setOnde(onde[0].Gourmet)
      //console.log(onde)
    }

    else{
      //console.log("Deu errado :(")
    }
  } catch (error) {
    //console.log("deu errado dog")
  }

}


handleTrilha()



  return (
    <SafeAreaView style={styles.status} >
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 99 }}>
        <FontAwesome size={30} color={"#FFF"} name='arrow-left' style={[styles.backicon, { backgroundColor: route.params.paramKey[2] }]} />
      </TouchableOpacity>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style ={{ flexGrow: 1, paddingBottom: 300 }}>

        <View style={{backgroundColor: route.params.paramKey[2],marginTop: '5%', width: width - 20, height: 285, borderRadius:15, alignSelf: "center", marginBottom: 40, zIndex: 1 }}>
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
        { Platform.OS === 'ios' ? (
          <>
            <Modal visible={visible}
                onRequestClose={handleModal} 
                animationType="slide"
                transparent={true}
                style={{ zIndex: 101 }}
                >
                    <ModalTrilha
                        handleAction={handleModal}
                        data={modal}
                        navigation={navigation}
                        cor={route.params.paramKey[2]}
                        bg={bg}
                        setBg={setBg}
                    
                    />
            </Modal>
          </>
        ) : (
          <>
            <Modal visible={visible}
                onRequestClose={handleModal}
                transparent={true}
                animationType='fade'
                style={{ zIndex: 100 }}
                >
                    <View style={{ flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} >

                    </View>
            </Modal>
            <Modal visible={visible}
                onRequestClose={handleModal} 
                animationType="slide"
                transparent={true}
                style={{ zIndex: 101 }}
                >
                    <ModalTrilha
                        handleAction={handleModal}
                        data={modal}
                        navigation={navigation}
                        cor={route.params.paramKey[2]}
                        bg={bg}
                        setBg={setBg}
                    
                    />
            </Modal>
          </>
        )}
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
            
                {onde +1 == Receitas[Receitas.indexOf(item)].Posicao &&(

                  <Image  style={styles.bandeira} source={require('../../assets/Bandeira-Trilha.png')}/>

                )}
                 {onde +1 > Receitas[Receitas.indexOf(item)].Posicao &&(

                  <Image  style={styles.estrela} source={require('../../assets/estrelha-trilha.png')}/>

                )}
                  {onde +1 < Receitas[Receitas.indexOf(item)].Posicao &&(

                    <Text style={styles.textoFase}>{item.Posicao}</Text>

                )}



            
              </View>
              <View style={styles.rightRow} >
                <Text style={styles.descricaoFase}>{item.Nome}</Text>
                <Image style={styles.detail} source={require("../../assets/lines-detail.png")} />
                 {onde +1 >= Receitas[Receitas.indexOf(item)].Posicao && (
                <View style={[{ marginTop: 20, backgroundColor: route.params.paramKey[2], marginBottom: 15, width: '85%', height: 37, borderRadius: 15, zIndex: 4 }]} >
                 

                  <TouchableOpacity style={[{
                    backgroundColor:route.params.paramKey[2],
                    height: '83%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    }]}  
                    onPress={() => handleModal(item)}
                  >
                    <Text style={styles.buttonsee} >Ver receita</Text>
                  </TouchableOpacity>

  
                  <View style={[{ backgroundColor: 'rgba(0,0,0,0.15)', height: '100%', width: '100%', position: 'absolute', borderRadius: 15, zIndex: 4 }]} >

                  </View>
                </View>

                )}
                  {onde +1 < Receitas[Receitas.indexOf(item)].Posicao && (
                    <FontAwesome style={styles.cadeado} name="lock" size={58} color="black" />
                   )}
              </View>
            
            </View>
            {Receitas[Receitas.indexOf(item)].Posicao < Receitas.length && <View>
              <View style={styles.linha}>
              <Image tintColor={route.params.paramKey[2]} style={{ height: 97.2, width: 19.2 }} source={require('../../assets/seta_default.png')} />
            </View>
            </View>
             }
            </View> 
        )}
        />
      </ScrollView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  
  status:{
    backgroundColor: "#EFEFEF",
  },
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#EFEFEF",
    marginBottom:20
  },
  backicon:{
    padding: 7, 
    paddingHorizontal: 9, 
    position: 'absolute', 
    zIndex: 99, 
    top: 25, 
    left: 15, 
    borderRadius: 100
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
    backgroundColor:'#FFF',

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
    marginVertical: '4%',
    marginBottom: -10
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
    },
    cadeado:{
      alignSelf: 'center',
      marginTop: 10
    },
    estrela:{
      width: 80,
      height: 80,
      alignSelf: 'center',
    },
    bandeira:{
      width: 70,
      height: 70,
      alignSelf: 'center',
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