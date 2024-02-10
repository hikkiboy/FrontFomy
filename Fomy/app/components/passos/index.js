import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView, Animated } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId, collectionGroup } from '@firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';
import { center } from '@shopify/react-native-skia';
import { Feather, FontAwesome } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPassos from '../videopasso';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useSharedValue, Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';



export default function Passos({route, props, navigation}) {

  //tintColor={route.params.paramKey[2]} style={{ height: 97.2, width: 19.2 }}
  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)
  const [Passo, setPasso] = useState([])
  const [calcula, setCalcula] = useState(1)
  const [ViPasso, setVideo] = useState()
  const [totalPassos, settotalPassos] = useState([])
  const [current, setCurrent] = useState(0)
  const {width} = Dimensions.get('window')
  const itemWidth = width
  
  const corDinamica = route.params.paramKey[1]
  console.log("-------------COR---------------")
  console.log(route.params.paramKey[1])
  
  const [xednIllorcSlaitint, setxednIllorcSlaitint] = useState(0)
  
  
  const [selectedItem, setSelectedItem] = useState(null);

  let arr = []

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
  };
  
  const handleOnCloseModal = () => {
    setSelectedItem(null);
  };

  const key = route.params.paramKey[0]
  
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

const _colors = {
  ativo : corDinamica,
  inativo : `#F2F2F2`
}

function pa(i, fwd){
  if(i < Receitas.length && fwd == true){
    i++;
    setCalcula(i);
    setPasso(Receitas[(i - 1)]);

    if(xednIllorcSlaitint == Receitas.length - 1){
      return;
    }

    setxednIllorcSlaitint(xednIllorcSlaitint + 1)
    //console.log("Valor: "+ i + "Valor2: "+calcula);

  } else if(fwd == false && i - 1 != 0){
    i--;
    setCalcula(i);
    setPasso(Receitas[(i - 1)]);
    if(xednIllorcSlaitint === 0) {
      return;
    }
    setxednIllorcSlaitint(xednIllorcSlaitint - 1)
   
    console.log("eh isso q vc ouviu: ", xednIllorcSlaitint)
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

console.log()

const ref = React.useRef(null);

try {
  useEffect(() => {
    console.log(Receitas.length)
    setTimeout(() => {
      ref.current?.scrollToIndex({
        index: xednIllorcSlaitint,
        animated: true,
        viewPosition: 0.3
      })
    }, 400);
}, [xednIllorcSlaitint])
} catch (error) {
  console.log(error)
  console.log("asldmçlsadm")
}


  return (
       <SafeAreaView style={styles.container}>
        <ScrollView>
        {/* <Button title='debug' onPress={() => console.log(arr)}></Button>  */}
            <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.goback} ><FontAwesome5 name="arrow-left" size={32} color="white" /></TouchableOpacity>
          <View style={[styles.imagebak, {
            backgroundColor: corDinamica
          }]}>
            <View style={styles.areatitulo}>
              <View style={[styles.titulopasso,{
                backgroundColor: corDinamica,
              }]}>
              <Text style={styles.titulopassotexto}> Passo {Passo.Sequencia}:  {Passo.Titulo}</Text>
            </View>
            </View>
          <VideoPassos idVideo={Passo.VideoPasso} style={styles.videofromyt}/>
            <View>
            </View>
            </View>


          <View style={styles.buttons} >
              <TouchableOpacity style={styles.stepbak} onPress={() => pa(calcula, false) } ><Foundation name="refresh" size={30} color="black" /></TouchableOpacity>
               <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} />
              <TouchableOpacity style={styles.stepfwd} onPress={() => pa(calcula, true) } ><FontAwesome name={"check"} size={30} /></TouchableOpacity>
            </View>
            
            <View style={styles.descpassoarea}>
              <Text style={[styles.descpasso, {
                borderColor: corDinamica
              }]} >{Passo.Passo}</Text>
              <View style={styles.descpassoBehind}></View>
            </View>
              
              
          <View style={styles.passoAtualArea}>
          <FlatList 
            ref={ref}
            horizontal
            scrollEnabled = {false}
            
            data={Receitas}
            keyExtractor={(item) => item.key}
            bounces = {false}
            showsHorizontalScrollIndicator = {false}
            scrollEventThrottle={32}
            initialScrollIndex={xednIllorcSlaitint}
            renderItem={({item, index}) => (
                <View style={styles.containtraco}> 
                {Receitas[Receitas.indexOf(item)].Sequencia != 1 &&
                  <View style={[styles.traco, {
                    backgroundColor: index <= xednIllorcSlaitint ? _colors.ativo : _colors.inativo
                  }]} />
                }
                
                  <View style={[styles.passoAtual, {
                    marginLeft: index == 0 ? 125 : 10,
                    marginRight: index  == Receitas.length - 1 ? 125 : 10,
                    opacity: index == xednIllorcSlaitint ? 1 : 0.6,
                    height: index == xednIllorcSlaitint ? 76 : 60,
                    width: index == xednIllorcSlaitint ? 72 : 60,
                    backgroundColor: corDinamica
                  }]}>
                  <Text style={[styles.passoAtualTexto,{
                    fontSize: index == xednIllorcSlaitint ? 50 : 30,
                  }]}>{item.Sequencia}</Text>
                  </View>
                    
                </View>
            )}
            />
            </View>


          <View style={styles.spaceinbetween}/>

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
    height: 350, 
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
    marginBottom: 110

    
  },
  areatitulo:{
      marginTop: 30,
      paddingStart: 40,
      paddingEnd: 40,
      width: '100%',
      alignSelf: 'center',
      marginBottom: 10
      //position: 'absolute'
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
  descpassoarea:{
    marginTop: -80,
    marginBottom: 30
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
    marginTop: 45,
    paddingHorizontal: 30,
    //marginVertical: 100
    
  },
  descpassoBehind:{
    zIndex: 1,
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
    alignSelf: 'center'
  },
  buttons:{
    justifyContent: 'center', 
    flexDirection: 'row',
    height: '19%',
    marginBottom: 40,
    marginTop: -70,
    alignItems: 'center',
  },
  stepbak:{
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
    height: 130,
    backgroundColor: 'white',
    borderColor: '#E5E5E5',
    borderWidth: 5,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 9,
    borderTopWidth: 8,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
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
    borderColor: '#4A8E4B',
    borderWidth: 4,
    borderBottomWidth: 8,
    margin: 10

  },
  passoAtualTexto:{
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold' ,
    textAlign: 'center',
    zIndex: 9
  },
  spaceinbetween:{
    backgroundColor: '#F2F2F2',
    zIndex: 0,
    width: '100%',
    height: '25%',
    top: -205,
    position: 'relative'
  },
  traco:{
    width: 90,
    height: 10,
    borderRadius: 90,
    alignSelf: 'center'
  },
  containtraco:{
    justifyContent: 'center',
    flexDirection: 'row'
  },
  videofromyt:{
    marginTop: 120
  }

 

});


