import { StyleSheet, Text, View, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, Vibration, ImageBackground, ScrollView, Animated, Platform, AppState, AppEvent } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, collectionGroup } from '@firebase/firestore'
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
import TimerPasso from '../timer/index';
import TimerPassoRerender from '../timer/timer2';
import { stopSound } from '../timer/index';
import { NavigationContainer } from '@react-navigation/native';
import AlbertoCustom from '../customalberto';


//import Timer from '../timer';


export default function Passos({ route, props, navigation }) {

  //tintColor={route.params.paramKey[2]} style={{ height: 97.2, width: 19.2 }}
  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)
  const [Passo, setPasso] = useState([])
  const [calcula, setCalcula] = useState(1)
  const [ViPasso, setVideo] = useState()
  const [totalPassos, settotalPassos] = useState([])
  const [current, setCurrent] = useState(0)
  const { width } = Dimensions.get('window');
  //
  const [rerender, setRerender] = useState(true)

  const corDinamica = route.params.paramKey[1]
  const userRecipes = route.params.user[0]

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
  useEffect(() => {

    const receitaRef = collection(app_DB, `Receitas/${key}/Passos`)

    const q = query(
      receitaRef,
    )
    const subscriver = onSnapshot(q, {
      next: (snapshot) => {
        const receitas = []
        snapshot.docs.forEach(doc => {
          receitas.push({
            key: doc.id,
            ...doc.data(),
          })
        })
        setReceitas(receitas)
        //isso pode causar problemas quando a pessoa estiver fazendo e ocorrer uma atualização no banco de dados,
        //porque reiniciará a posição dela, talvez depois fazer uma outra variavel que define se isso carregou pela primeira vez
        setPasso(receitas[0])

      }
    })
    return () => subscriver()


  }, [])

  useEffect(() => {
    if (!rerender) {
      setRerender(true)
    }
  }, [Passo.Timer])

  const _colors = {
    ativo: corDinamica,
    inativo: `#F2F2F2`
  }

  function pa(i, fwd) {
    setRerender(false)
    if (i < Receitas.length && fwd == true) {
      i++;
      setCalcula(i);
      setPasso(Receitas[(i - 1)]);

      if (xednIllorcSlaitint == Receitas.length - 1) {
        return;
      }

      setxednIllorcSlaitint(xednIllorcSlaitint + 1)
      //console.log("Valor: "+ i + "Valor2: "+calcula);

    } else if (fwd == false && i - 1 != 0) {
      i--;
      setCalcula(i);
      setPasso(Receitas[(i - 1)]);
      if (xednIllorcSlaitint === 0) {
        return;
      }
      setxednIllorcSlaitint(xednIllorcSlaitint - 1)

      console.log("eh isso q vc ouviu: ", xednIllorcSlaitint)
      //console.log("Valor: "+ i + "Valor2: "+calcula);

    } else if (i - 1 == 0 && fwd == false) {
      navigation.goBack()
    } else {
      Vibration.cancel()
      stopSound()
      if (userRecipes.includes(key) && route.params.origin[0] == "Trilha") {
        navigation.navigate("Trilha", { paramKey: [route.params.trilha[0], route.params.description[0], route.params.paramKey[1], route.params.paramKey[2], route.params.paramKey[3]] })
      } else if (userRecipes.includes(key) && route.params.origin[0] == "Book") {
        navigation.navigate("HomeStart")
      } else {
        navigation.navigate("Parabens", { paramKey: [Receitas[0].Parabenizacao, Receitas[0].id.replace(/\s/g, ""), Receitas[0].Trilha], cores: [route.params.paramKey[1], route.params.paramKey[3], route.params.paramKey[2]], navigate: [route.params.trilha[0], route.params.description[0], route.params.paramKey[1], route.params.paramKey[2], route.params.paramKey[3]] })
      }
    }
  }

  function pasquared(the) {
    setRerender(false)
    setCalcula(the + 1)
    console.log("calcula: ", calcula, "index: ", the)
    setPasso(Receitas[(the)])
    setxednIllorcSlaitint(the)
  }




  const aaaa = Receitas.length

  for (i = 1; i <= aaaa; i++) {
    arr.push(i)
  }

  const ref = React.useRef(null);

  try {
    useEffect(() => {
      console.log("tamanho: ", Receitas.length)
      if (Receitas.length != 0) {
        setTimeout(() => {
          ref.current.scrollToIndex({
            index: xednIllorcSlaitint,
            animated: true,
            viewPosition: 0.3
          })
        }, 50);
      } else {
        console.log("Im blue dabadee dabadaa  (o tamanho tava 0)");
      }
    }, [xednIllorcSlaitint])

  } catch (error) {
    console.log(error)
    console.log("asldmçlsadm")
  }
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        Vibration.cancel();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: '#F2F2F2' }} showsVerticalScrollIndicator={false} >
        {/* <Button title='debug' onPress={() => console.log(arr)}></Button>  */}
        <TouchableOpacity onPress={() => { navigation.goBack(); Vibration.cancel(); stopSound(); }} style={styles.goback} ><FontAwesome name="arrow-left" size={30} color="white" /></TouchableOpacity>
        <View style={{ backgroundColor: '#FFF' }} >
          <View style={[styles.imagebak, {
            backgroundColor: corDinamica,
            borderColor: route.params.paramKey[3],
            zIndex: 2
          }]}>
            <View style={styles.areatitulo}>
              <View style={[styles.titulopasso, {
                borderColor: route.params.paramKey[2],
                backgroundColor: route.params.paramKey[3],
              }]}>
                <Text allowFontScaling={false} style={styles.titulopassotexto}>{Passo.Titulo}</Text>
              </View>
            </View>
            {Passo.Timer && rerender ? (
              <TimerPasso totalDuration={Passo.Timer} />
            ) : (
              stopSound(),
              Vibration.cancel(),
              Passo.VideoPasso ? (
                <VideoPassos idVideo={Passo.VideoPasso} />
              ) : (
                Passo.Timer && !rerender && <TimerPassoRerender totalDuration={Passo.Timer} />
              )
            )}
          </View>
        </View>


        <View style={styles.buttons} >
          <TouchableOpacity style={styles.stepbak} onPress={() => pa(calcula, false)} ><Foundation name="refresh" size={49} color="#FFF" /></TouchableOpacity>
          {/* <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} /> */}
          <AlbertoCustom width={150} height={150}/>
          <TouchableOpacity style={styles.stepfwd} onPress={() => pa(calcula, true)} ><FontAwesome name={"check"} size={45} color="#FFF" /></TouchableOpacity>
        </View>

        <View style={styles.descpassoarea}>
          <Image style={styles.triangle} tintColor={corDinamica} source={require("../../assets/little_triangle_thing.png")} />
          <View style={{ width: '100%', zIndex: 2 }} >
            <View style={[styles.viewpasso, { borderColor: corDinamica }]} >
              <Text allowFontScaling={false} style={styles.descpasso} >{Passo.Passo}</Text>
            </View>
            <View style={[styles.descpassoBehind, {
              borderColor: route.params.paramKey[3],
            }]} />
          </View>
          <View style={styles.spaceinbetween} />
        </View>

      </ScrollView>

      <View style={[styles.passoAtualArea, { borderColor: corDinamica }]}>
        <FlatList
          ref={ref}
          horizontal
          data={Receitas}
          keyExtractor={(item) => item.key}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          initialScrollIndex={xednIllorcSlaitint}
          renderItem={({ item, index }) => (
            <View style={styles.containtraco}>
              {Receitas[Receitas.indexOf(item)].Sequencia != 1 &&
                <View style={[styles.traco, {
                  backgroundColor: index <= xednIllorcSlaitint ? _colors.ativo : _colors.inativo
                }]} />
              }

              <TouchableOpacity
                onPress={() => { pasquared(index) }}
                activeOpacity={0.8}
                style={[styles.passoAtual, {
                  marginLeft: index == 0 ? (width / 2) - 38.5 : 10, //pega metade da tela menos metade do bloco
                  marginRight: index == Receitas.length - 1 ? (width / 2) - 38.5 : 10,
                  opacity: index == xednIllorcSlaitint ? 1 : 0.6,
                  paddingVertical: index == xednIllorcSlaitint ? 2 : 6,
                  width: index == xednIllorcSlaitint ? 77 : 56,
                  backgroundColor: corDinamica,
                  borderColor: route.params.paramKey[3]
                }]}>
                <Text allowFontScaling={false} style={[styles.passoAtualTexto, {
                  fontSize: index == xednIllorcSlaitint ? 50 : 30,
                }]}>{item.Sequencia}</Text>
              </TouchableOpacity>

            </View>
          )}
        />
      </View>

    </SafeAreaView >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#FFF"

  },
  goback: {
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
  imagebak: {
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
  areatitulo: {
    marginTop: 50,
    paddingStart: 20,
    paddingEnd: 20,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20
    //position: 'absolute'
  },
  titulopasso: {
    zIndex: 99,
    backgroundColor: "#4A8E4B",
    borderRadius: 30,
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
  titulopassotexto: {
    fontSize: 21,
    color: "white",
    fontFamily: "FredokaSemibold",
    textAlign: 'center'

  },
  descpassoarea: {
    marginBottom: 50,
  },
  descpasso: {
    zIndex: 2,
    fontSize: 19,
    textAlign: 'center',
    fontFamily: "FredokaMedium",
    color: "#303030",
    //marginVertical: 100

  },
  viewpasso: {
    zIndex: 3,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 8,
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    width: '100%',
  },
  descpassoBehind: {
    zIndex: 1,
    borderColor: '#4A8E4B',
    width: '100%',
    height: '100%',
    marginTop: 9,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 10,
  },
  charimage: {
    height: 144,
    width: 119,
    left: -1,
    alignSelf: 'center'
  },
  triangle: {
    height: 27.6,
    width: 46.2,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -21,
    zIndex: 99
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  stepbak: {
    marginHorizontal: 20,
    padding: 8,
    paddingHorizontal: 17,
    backgroundColor: "#F1555A",
    borderRadius: 15,
    borderColor: '#BC4246',
    borderWidth: 4,
    borderBottomWidth: 10,
    alignItems: 'center'
  },
  stepfwd: {
    marginHorizontal: 20,
    padding: 10,
    paddingHorizontal: 11,
    backgroundColor: "#62BC63",
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#4A8E4B',
    borderWidth: 4,
    borderBottomWidth: 10
  },
  passoAtualArea: {
    width: '100%',
    backgroundColor: '#FFF',
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
    borderTopWidth: 8,
    height: 120
  },
  passoAtual: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62BC63',
    borderRadius: 15,
    borderColor: '#4A8E4B',
    borderWidth: 4,
    borderBottomWidth: 8,
    marginHorizontal: 10

  },
  passoAtualTexto: {
    color: 'white',
    fontSize: 50,
    fontFamily: "FredokaSemibold",
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    zIndex: 9
  },
  spaceinbetween: {
    backgroundColor: '#FFF',
    zIndex: 0,
    width: '100%',
    height: '50%',
    position: 'absolute'
  },
  traco: {
    width: 90,
    height: 10,
    borderRadius: 90,
    alignSelf: 'center'
  },
  containtraco: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },



});


