import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId, collectionGroup } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';
import { center } from '@shopify/react-native-skia';
import { Feather } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPassos from '../videopasso';


export default function Passos({route, props, navigation}) {


  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)
  const [Passo, setPasso] = useState([])
  const [calcula, setCalcula] = useState(1)
  const [ViPasso, setVideo] = useState()

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

  } else if(fwd == false && i - 1 != 0){
    i--;
    setCalcula(i);
    setPasso(Receitas[(i - 1)]);
    console.log("Valor: "+ i + "Valor2: "+calcula);

  } else if( i - 1 == 0 && fwd == false ){
    navigation.goBack()
  } else{
    //coloquei isso o replace prq ele tava mandando o id com espaço (?????) ai o query n funfava
    navigation.navigate("Parabens", {paramKey:[Receitas[0].Parabenizacao,Receitas[0].id.replace(/\s/g, ""), Receitas[0].Trilha]})
  }
}


  return (
       <SafeAreaView style={styles.container}>
        <ScrollView>
          <ImageBackground style={styles.imagebak} source={require('../../assets/Group171.png')}>
            <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.goback} ><Feather name="chevron-left" color={"black"} size={40} /></TouchableOpacity>
            <View style={styles.areatitulo}>
              <Text style={styles.titulopasso}> Passo {Passo.Sequencia}:  {Passo.Titulo}</Text>
            </View>
            <View>
            </View>
          </ImageBackground>
          <VideoPassos idVideo={Passo.VideoPasso} style={styles.videofromyt}/>
          <View style={styles.belowimage} >
          <View style={styles.buttons} >
            <Button title='debug' onPress={() => console.log(Passo.VideoPasso)}></Button>
              <TouchableOpacity style={styles.stepbak} onPress={() => pa(calcula, false) } ><Feather name={"arrow-left"} size={40} /></TouchableOpacity>
              <TouchableOpacity style={styles.stepfwd} onPress={() => pa(calcula, true) } ><Feather name={"arrow-right"} size={40} /></TouchableOpacity>
            </View>
            <View style={styles.teacharea} >
              <Text style={styles.descpasso} >{Passo.Passo}</Text>
              <Image style={styles.bubbleimage} source={require("../../assets/bubbleTriangle.png")} />
              <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} />
            </View>

          </View>
        </ScrollView>
       </SafeAreaView>  
      )} 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    display: 'flex',
    backgroundColor: "#FFF"
    
  },
  goback:{
    position: 'absolute', 
    zIndex: 99, 
    marginTop: 10, 
    marginLeft: 3
  },
  imagebak:{
    height: 210, 
    zIndex: 0,
    backgroundColor: 'white'
  },
  areatitulo:{
    width: '90%',
    height:30,
    borderRadius: 20,
    backgroundColor: '#5D875D',
    alignSelf: 'center',
    marginTop: 65,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulopasso:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',

  },
  videofromyt:{
    height: 200,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: -20
  },
  belowimage:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: "#FFF",
    marginTop: -130
  },
  teacharea:{
    width: '90%',
    alignItems: 'center',
    
    
  },
  descpasso:{
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000000',
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    padding: 5
  },
  charimage:{
    height: 144,
    width: 119,
    marginTop: 15
  },
  bubbleimage:{
    height: 75,
    width: 59,
    marginTop: -30
  },
  buttons:{
    justifyContent: 'center', 
    flexDirection: 'row',
  },
  stepbak:{
    marginBottom: 35,
    marginHorizontal: 35,
    padding: 20,
    backgroundColor: "#F68F92",
    borderRadius: 15
  },
  stepfwd:{
    marginBottom: 35,
    marginHorizontal: 35,
    padding: 20,
    backgroundColor: "#7EB77F",
    borderRadius: 15
  }
 

});


