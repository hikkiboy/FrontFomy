import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId, collectionGroup } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';
import { center } from '@shopify/react-native-skia';
import { Feather, FontAwesome } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPassos from '../videopasso';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Passos({route, props, navigation}) {


  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)
  const [Passo, setPasso] = useState([])
  const [calcula, setCalcula] = useState(1)
  const [ViPasso, setVideo] = useState()
  const [totalPassos, settotalPassos] = useState([])
  

  const [selectedItem, setSelectedItem] = useState(null);

  let arr = []

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
    //console.log("Valor: "+ i + "Valor2: "+calcula);

  } else if(fwd == false && i - 1 != 0){
    i--;
    setCalcula(i);
    setPasso(Receitas[(i - 1)]);
    //console.log("Valor: "+ i + "Valor2: "+calcula);

  } else if( i - 1 == 0 && fwd == false ){
    navigation.goBack()
  } else{
    //coloquei isso o replace prq ele tava mandando o id com espaço (?????) ai o query n funfava
    navigation.navigate("Parabens", {paramKey:[Receitas[0].Parabenizacao,Receitas[0].id.replace(/\s/g, ""), Receitas[0].Trilha]})
  }
}



const aaaa = Receitas.length

for(i = 1; i <= aaaa; i++)
{
  arr.push(i)
}


  return (
       <SafeAreaView style={styles.container}>
        <ScrollView>
        {/* <Button title='debug' onPress={() => console.log(arr)}></Button>  */}
            <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.goback} ><FontAwesome5 name="arrow-left" size={32} color="white" /></TouchableOpacity>
            <View style={styles.areatitulo}>
              <View style={styles.titulopasso}>
              <Text style={styles.titulopassotexto}> Passo {Passo.Sequencia}:  {Passo.Titulo}</Text>
            </View>
            </View>
          <View style={styles.imagebak}/>
            <View>
            </View>

          <VideoPassos idVideo={Passo.VideoPasso} style={styles.videofromyt}/>
          <View style={styles.belowimage} >
          <View style={styles.buttons} >
            
              <TouchableOpacity style={styles.stepbak} onPress={() => pa(calcula, false) } ><Foundation name="refresh" size={30} color="black" /></TouchableOpacity>
              <TouchableOpacity style={styles.stepfwd} onPress={() => pa(calcula, true) } ><FontAwesome name={"check"} size={30} /></TouchableOpacity>
              <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} />
            </View>
            <View style={styles.teacharea} >
              <Text style={styles.descpasso} >{Passo.Passo}</Text>
              <View style={styles.descpassoBehind} ></View>
            </View>
          </View>
          <View style={styles.spaceinbetween}>

          </View>
          <View style={styles.passoAtualArea}>
          <FlatList nestedScrollEnabled
            horizontal
            data={arr}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
              
                <View style={styles.passoAtual}>
                <Text style={styles.passoAtualTexto}>{item}</Text>
                </View>
              
            )}
            />
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
    height: 300, 
    borderRadius: 20,
    backgroundColor: '#62BC63',
    borderColor: '#4A8E4B',
    borderBottomWidth: 10,
    borderBottomRightRadius: 20,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderStartWidth: 4,
    borderEndWidth: 4,
    borderTopWidth: 4,
    
  },
  areatitulo:{
      marginTop: 30,
      paddingStart: 40,
      paddingEnd: 40,
      width: '100%',
      alignSelf: 'center',
      position: 'absolute'
  },
  titulopasso:{
    zIndex: 99,
    backgroundColor: "#4A8E4B",
    borderRadius: 50,
    padding: 10,
    borderWidth: 5,
    borderBottomWidth: 10,
    borderTopWidth: 4,
    borderColor: "#356635",
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulopassotexto:{
    fontSize: 20,
    fontWeight: '600',
    color: "white",
    fontWeight: 'bold'
    
  },
  descpasso:{
    zIndex: 2,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000000',
    borderColor: '#62BC63', 
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 8,
    padding: 10,
    paddingBottom: -5,
    backgroundColor: 'white',
    marginTop: 50
  },
  descpassoBehind:{
    zIndex: 0,
    borderColor: '#4A8E4B', 
    width: '100%',
    height: 35,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 10,
    marginTop: -28
  },
  charimage:{
    height: 144,
    width: 119,
    marginTop: 15,
    alignSelf: 'center'
  },
  buttons:{
    justifyContent: 'center', 
    flexDirection: 'row',
    height: '19%',
    marginBottom: 40,
    marginTop: 40,
    alignItems: 'center',
  },
  stepbak:{
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#F1555A",
    borderRadius: 15,
    borderColor: '#BC4246',
    borderWidth: 4,
    borderBottomWidth: 10,
    height: 80,
    width: 80,
    alignItems: 'center'
  },
  stepfwd:{
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#62BC63",
    borderRadius: 15,
    height: 80,
    width: 80,
    alignItems: 'center',
    borderColor: '#4A8E4B',
    borderWidth: 4,
    borderBottomWidth: 10
  },
  passoAtualArea:{
    width: '100%',
    height: 125,
    backgroundColor: 'white',
    borderColor: '#E5E5E5',
    borderWidth: 5,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 9
  },
  passoAtual:{
    width: 70,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#62BC63',
    borderRadius: 10,
    margin: 40,
    borderColor: '#4A8E4B',
    borderWidth: 4,
    borderBottomWidth: 8

  },
  passoAtualTexto:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'  
  },
  spaceinbetween:{
    backgroundColor: '#F2F2F2',
    zIndex: 0,
    width: '100%',
  }

 

});


