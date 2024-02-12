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
    }
    else if(route?.params.paramKey[0] == "Básico"){
      setOnde(onde[0].Básico)
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
      { Platform.OS === 'ios' ? (
        <>
          <StatusBar style="#FFF"/>
        </>
      ): 
      (
        <>
        </>
      )}
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ zIndex: 99 }}>
        <View style={[styles.backiconarea, {backgroundColor: route.params.paramKey[2]}]} >
          <FontAwesome size={30} color={"#FFF"} name='arrow-left' />
        </View>
      </TouchableOpacity>
      <ScrollView>

        <View style={[styles.bgimg, {backgroundColor: route.params.paramKey[2]}]}>
          <Image tintColor={route.params.paramKey[4]} style={ styles.booklet } source={require('../../assets/booklet.png')} />
          <View style={ styles.titlearea } >
            <Image  style={{width:108, height:139, marginRight: 5}} source={require('../../assets/betterAlberto.png')}/>
            
            <View style={{flex: 1, justifyContent: 'center' }}>
              <Text style={[styles.trilhaTit]}>{route.params.paramKey[0]}</Text>
              <Text style={[styles.textoTrilha]}>{route.params.paramKey[1]}</Text>
            </View>
          </View>
          {/*<View style={[{ height: '100%', width: '100%',borderRadius: 20, zIndex: 1, position: 'absolute', borderBottomWidth: 6,  borderColor: "rgba(0,0,0,0.10)" }]} />*/}
            
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
                        borderColor={route.params.paramKey[3]}
                        Fill={route.params.paramKey[4]}
                    
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
                        borderColor={route.params.paramKey[3]}
                        Fill={route.params.paramKey[4]}
                    
                    />
            </Modal>
          </>
        )}
        {/* FIM DO MODAL */}
        
        <View style={{ paddingBottom: 40 }}>
          <FlatList
          data={Receitas}
          scrollEnabled = {false}
          showsVerticalScrollIndicator ={false}
          renderItem={({item}) => (
            <View style={styles.container} >
              <View style={styles.row} >
                {/*this was my peak*/}
                {/*<View style={{ height: '100%', width: '100%', zIndex: 1, backgroundColor: '#C9C9C9', position: 'absolute', borderRadius: 15, marginTop: 5 }} ></View>
                <View style={{ height: '100%', width: '30%', zIndex: 2, backgroundColor: 'rgba(0,0,0,0.15)', position: 'absolute', borderRadius: 15, borderBottomRightRadius: 0, marginTop: 5 }} ></View>*/}
                <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: route.params.paramKey[4], position: 'absolute', borderRadius: 20, marginTop: 6 }]} />
                <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: "#FFF", position: 'absolute', borderRadius: 20, borderColor: route.params.paramKey[4], borderWidth: 7 }]} />
                
                <View style={[{
                  backgroundColor:route.params.paramKey[2],
                  borderColor: route.params.paramKey[4],
                  borderWidth: 7,
                  width: 120,
                  height: "100%",
                  borderRadius: 20,
                  borderBottomLeftRadius: 20,
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
                <View style={[styles.rightRow, {borderColor: route.params.paramKey[4]}]} >
                  <Text style={[styles.descricaoFase]}>{item.Nome}</Text>
                  <Image style={styles.detail} source={require("../../assets/lines-detail.png")} />
                  {onde +1 >= Receitas[Receitas.indexOf(item)].Posicao && (
                    <View style={[{ marginTop: 15, backgroundColor: route.params.paramKey[3], width: '100%', borderRadius: 15, zIndex: 4, marginBottom: 2 }]} >
                      <View style={[{ height: '100%', width: '100%', zIndex: 1, backgroundColor: route.params.paramKey[4], position: 'absolute', borderRadius: 15, marginTop: 2 }]} />

                      <TouchableOpacity style={[{
                        backgroundColor:route.params.paramKey[2],
                        paddingVertical: 4,
                        borderRadius: 15,
                        borderWidth: 4,
                        borderColor: route.params.paramKey[4],
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                        }]}  
                        onPress={() => handleModal(item)}
                        activeOpacity={0.8}
                        >
                          <Text style={styles.buttonsee} >Ver receita</Text>
                      </TouchableOpacity>
                    </View>

                  )}
                    {onde +1 < Receitas[Receitas.indexOf(item)].Posicao && (
                      <FontAwesome style={styles.cadeado} name="lock" size={50} color={route.params.paramKey[3]} />
                    )}
                </View>
              
              </View>
              
              </View> 
          )}
          ItemSeparatorComponent={ <Image tintColor={route.params.paramKey[2]} style={{ height: 97.2, width: 19.2, marginVertical: 10, alignSelf: 'center' }} source={require('../../assets/seta_default.png')} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  
  status:{
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    display: 'flex',
  },
  backiconarea:{
    padding: 7, 
    paddingHorizontal: 9, 
    position: 'absolute', 
    zIndex: 99, 
    top: 10, 
    left: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  bgimg:{
    width: "100%",
    borderRadius: 20,
    marginBottom: 40
  },
  booklet:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch'
  },
  titlearea:{
    width: '100%',
    paddingStart: 30,
    paddingEnd: 30,
    marginVertical: 35,
    zIndex: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  row:{
    flexDirection: 'row', 
    alignContent: 'flex-end', 
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 6,
    backgroundColor: '#FFF',
  },
  rightRow:{
    flex: 1,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    backgroundColor:'#FFF',
    paddingVertical: 15,
    paddingStart: 15,
    paddingEnd: 15,
    borderWidth: 7,
    borderLeftWidth: 0

  },
  detail:{
    width: '70%',
    height: 5,
    marginTop: 7,
    resizeMode: 'stretch'
  },
  buttonsee:{
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold',

  },
  //fazer fonte depois
  trilhaTit:{
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFF",
    //fontFamily: FontFamily.leagueSpartanBold
  },
  textoTrilha:{
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: 'center',
    alignSelf: 'center',

  },
  linha:{
    alignSelf: 'center',
    alignItems: 'center',
    height: 97.2,
    width: '100%',
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
  },
  textoFase:{
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: 'bold',
    color: "rgba(0,0,0,0.6)",
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
      marginTop: 20
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