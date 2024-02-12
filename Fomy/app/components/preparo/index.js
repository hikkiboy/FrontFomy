import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'


export default function Preparo({route, props, navigation}) {


  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null);
  console.log(route.params.paramKey[3]);

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleOnCloseModal = () => {
    setSelectedItem(null);
  };

  
//   const NomeTrilha = route.params.paramKey
//     console.log(route.params.paramKey)
  useEffect(()=>{
    
    const receitaRef = collection(app_DB, 'Receitas')
    
    const q = query(
      receitaRef,
      where("Nome", "==", route.params.paramKey[0]), 
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
        }
      })
      
     
      return() => subscriver()
  
  },[])
  const [y, setY] = useState(1);
let arrayIng = []
let arrayBon = []
let arrayUtil = []
let arrayprep = []
let arrayporc = []


  return (
    <SafeAreaView style={styles.container} >
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ zIndex: 99 }}>
        <View style={[styles.backiconarea,{ backgroundColor: route.params.paramKey[1] }]} >
          <FontAwesome size={30} color={"#FFF"} name='arrow-left' />
        </View>
      </TouchableOpacity>
        {/* //   <View style={{backgroundColor: route.params.paramKey[2],marginTop: 14, width: 378, height: 219, borderRadius:15 }}>
        //   <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        //     <Image style={{width:109, height:109, marginTop: 18}} source={require('../../assets/fogao.png')}/>
        //     <Image  style={{width:108, height:139}} source={require('../../assets/alberto.png')}/>
        //     <StatusBar style="auto" />
        //     </View>
        //       <Text style={styles.trilhaTit}></Text>
        //       <Text style={styles.textoTrilha}></Text>
        //     </View>
        */}

   
        {/* <View style={styles.linha}></View> */}
        {/* fazer um flat list pra gerar as fases  */}

        <FlatList nestedScrollEnabled
          data={Receitas}
          scrollEnabled = {true}
          showsVerticalScrollIndicator ={false}
          renderItem={({item}) => (
            <View style={styles.container}>
              
              {/*I moved the title card and servings inside this flatlist and removed the scrollview
                 I haven't noticed any problems with that, and it removed the error that kept appearing*/}
              <View style={[styles.bgimg, {backgroundColor: route.params.paramKey[1]}]} >
                <View style={ styles.titlearea }>
                  <View style={ styles.title }>
                    <Text style={styles.titletxt}>{route.params.paramKey[0]}</Text>
                    <TouchableOpacity activeOpacity={0.8} style={[styles.seeimgbtn, {borderColor: route.params.paramKey[3], backgroundColor: route.params.paramKey[4]}]} >
                      <Text style={[styles.titletxt, {fontSize: 20}]} >Ver foto</Text>
                    </TouchableOpacity>
                  </View>
                  <Image 
                    source={{ uri: route.params.paramKey[2] }} 
                    style={styles.image}
                  />
                </View>
                <View style={[{ height: '100%', width: '100%',borderRadius: 20, zIndex: 1, position: 'absolute', borderBottomWidth: 11, borderWidth: 8, borderColor: route.params.paramKey[4] }]} />
              </View>
              
              <View style={{ paddingStart: 25, paddingEnd: 25 }} >
                <View style={[styles.bgimg, {backgroundColor: route.params.paramKey[1]}]} >
                  <View style={ styles.portionarea }>   
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }} >
                      <Text style={[styles.titletxt, {marginHorizontal: 11, marginRight: 25 , fontSize: 22}]}>1</Text>
                      <FontAwesome5 name='user-alt' size={20} color={"#FFF"} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
                      <Text style={[styles.titletxt, {fontSize: 22}]} >Porções</Text>
                      {/*<FontAwesome5 name='angle-down' size={40} color={"#FFF"} />*/}
                    </View>
                  </View>
                  <View style={[{ height: '100%', width: '100%',borderRadius: 20, zIndex: 1, position: 'absolute', borderBottomWidth: 10, borderWidth: 7, borderColor: route.params.paramKey[4] }]} />
                </View>
              </View>


    
              {/* <Button onPress={() => console.log(item)}></Button> */}
              <View style={{ paddingStart: 25, paddingEnd: 25, marginTop: 35, marginBottom: 10 }} >
                <View style={styles.Ingredientesbg}>
                  <Image style={styles.Cesta} tintColor={"#FFF"} source={require('../../assets/Cesta.png')}/>
                  <Text style={styles.IngredientesTexto}>Ingredientes</Text>
                </View>
              </View>

              <Text style={{opacity: 0, position: 'absolute'}}>{arrayIng.push(item.Ingredientes)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayBon.push(item.Bonus)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayUtil.push(item.Utensilios)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayprep.push(item.PassosSimp)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayporc.push(item.Porcoes)}</Text>

              <View style={styles.IngredientesContain}>
                  <FlatList nestedScrollEnabled
                    data={arrayIng[0]}
                    scrollEnabled = {true}
                    showsVerticalScrollIndicator = {false}
                    renderItem={({item}) => (
                      <View style={{paddingStart: 5,paddingEnd: 5}}>
                        <View style={styles.IngredientesNumContain}>
                          <View style={styles.checkmark}/>
                          <Entypo name='check' color={'#3B98EF'} size={38} style={{ position: 'absolute', paddingBottom: 18 }} />
                          
                          <View style={{ flex: 1, marginLeft: 10, }}>
                            <Text style = {styles.Ingredientes}>{item}</Text>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, flex: 1, height: 7 }} />
                          </View>
                        </View>
                      </View>
                    )}
                  />

                {/*arrayBon.includes(undefined) != true && (
                  <>
                    <View style={styles.BonusBg}>
                      <Text style={styles.BonusTexto}>Bônus</Text>
                    </View>

                    <Image style={styles.Ovo} source={require('../../assets/Ovo_leite.png')}/>
                    <FlatList nestedScrollEnabled
                      data={arrayBon[0]}
                      scrollEnabled = {true}
                      showsVerticalScrollIndicator = {false}
                      renderItem={({item}) => (
                        <View>
                          <View style={styles.BonusNumContain}>
                            <Text style={styles.NumeroBonus}>*</Text>
                            <Text style = {styles.Ingredientes}>{item}</Text>
                          </View>
                          <View style={{marginStart: 50, marginBottom: 10, marginTop: -12, backgroundColor: '#FAB151', borderRadius: 20, width: "80%", height: 7 }} />
                        </View>
                      )}
                    />
                  </>
                )*/}
              
      
                <View style={[styles.Ingredientesbg, {marginTop: 75, marginBottom: 10, backgroundColor: "#FAB151", borderColor: "#ED8A07"}]}>
                  <Image style={styles.Cesta} tintColor={"#FFF"} source={require('../../assets/bowl.png')}/>
                  <Text style={styles.IngredientesTexto}>Utensílios</Text>
                </View>
                <FlatList nestedScrollEnabled
                  data={arrayUtil[0]}
                  scrollEnabled = {true}
                  showsVerticalScrollIndicator = {false}
                  renderItem={({item}) => (
                    <View style={{paddingStart: 5,paddingEnd: 5}}>
                      <View style={styles.IngredientesNumContain}>
                        <View style={styles.checkmark}/>
                        <Entypo name='check' color={'#FAB151'} size={38} style={{ position: 'absolute', paddingBottom: 18 }} />
                        
                        <View style={{ flex: 1, marginLeft: 10, }}>
                          <Text style = {styles.Ingredientes}>{item}</Text>
                          <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, flex: 1, height: 7 }} />
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>

              <Image style={styles.detail} source={require("../../assets/lines-detail.png")} />
              
              <View style={[styles.bgimg, {backgroundColor: route.params.paramKey[1], marginBottom: 0}]} >
                <View style={ styles.titlearea }>
                  <View style={[ styles.title, { flexDirection: 'row', justifyContent: 'space-between'} ]}>
                    <Text style={[styles.titletxt]}>Passos</Text>
                    <TouchableOpacity style={[styles.stepsbtn, {backgroundColor: route.params.paramKey[4], borderColor: route.params.paramKey[3]}]} onPress={() => navigation.navigate('Passos',{paramKey:[item.key, route.params.paramKey[1], route.params.paramKey[3], route.params.paramKey[4]]})} activeOpacity={0.8}>
                      <FontAwesome5 name='play' color={"#FFF"} size={32} />
                    </TouchableOpacity>
                  </View>
                  <Image tintColor={"#FFF"} style={styles.image} source={require('../../assets/canvas.png')}/>
                </View>
                <View style={[{ height: '100%', width: '100%',borderRadius: 20, zIndex: 1, position: 'absolute', borderBottomWidth: 11, borderWidth: 8, borderColor: route.params.paramKey[4] }]} />
                <View style={ styles.stepslist } >
                  <FlatList nestedScrollEnabled
                    data={arrayprep[0]}
                    scrollEnabled = {true}
                    showsVerticalScrollIndicator = {false}
                    renderItem={({item}) => (
                      <View style={styles.IngredientesNumContain}>
                        <View style = {[styles.step, { backgroundColor: route.params.paramKey[1] }]}/>

                        <View style={{ flex: 1, marginLeft: 10, }}>
                          <Text style = {styles.Ingredientes}>{item}</Text>
                          <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, flex: 1, height: 7 }} />
                        </View>
                      </View>
                    )}
                  />
                </View>
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
    backgroundColor: '#FFF'
    
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
  titlearea:{
    width: '100%',
    paddingStart: 25,
    paddingEnd: 25,
    marginVertical: 40,
    zIndex: 98,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  title:{
    alignItems: 'center',
    flex: 1
  },
  titletxt:{
    fontWeight: 'bold',
    fontSize: 25,
    color: "#FFF",
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  seeimgbtn:{
    borderRadius: 20,
    borderWidth: 5,
    borderBottomWidth: 9,
    borderColor: "rgba(0,0,0,0.25)",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginTop: 10,
    paddingVertical: 5,
    width: "100%"
  },
  image:{
    height: 110, 
    width: 110,
    zIndex: 98,
    marginRight: 20
  },
  portionarea:{
    width: '100%',
    paddingStart: 25,
    paddingEnd: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20

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
  },
Ingredientesbg:{
    backgroundColor: "#3B98EF",
    width: '100%',
    borderRadius: 20,
    borderColor: '#2985DB',
    borderWidth: 7,
    borderBottomWidth: 10,
    paddingVertical: 15,
    paddingStart: 18,
    paddingEnd: 18,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:'row'

},
Cesta:{
  height: 60,
  width: 60,
  marginRight: 18
},
IngredientesTexto:{
    fontSize: 22,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1
},
IngredientesContain:{
    width: '100%',
    paddingStart: 25,
    paddingEnd: 25,
    marginBottom: 80
},
IngredientesNumContain:{
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginTop: 25
},
NumeroIngrediente:{
  fontSize: 30,
  fontWeight: 'bold',
  color: '#3B98EF'
},
checkmark:{
  width: 30, 
  height: 29, 
  borderColor: 'rgba(0,0,0,0.15)', 
  borderWidth: 2.5, 
  borderBottomWidth: 4.5, 
  borderRadius: 6, 
  marginBottom: 7,
},
Ingredientes:{
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
},
BonusBg:{
  backgroundColor: "#FAB151",
  width: '100%',
  borderRadius: 100,
  borderColor: '#ED8A07',
  borderWidth: 5,
  borderBottomWidth: 9,
  paddingVertical: 4,
  marginTop: 60,
  alignSelf: 'center'
  
},
BonusTexto:{
  fontSize: 22,
  textAlign: 'center',
  color: '#FFF',
  fontWeight: 'bold'

},
BonusNumContain:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingStart: 20
  
},
NumeroBonus:{
  fontSize: 30,
  fontWeight: 'bold',
  color: '#FAB151'
},
detail:{
  alignSelf: 'center',
  resizeMode: 'stretch',
  width: 245,
  height: 9,
  marginBottom: 80
},
stepslist:{
  backgroundColor: '#FFF',
  marginBottom: 40,
  paddingBottom: 25,
  paddingStart: 20,
  paddingEnd: 20,
  borderRadius: 15,
  marginHorizontal: 25
},
step:{
  width: 17, 
  height: 17,
  borderRadius: 100, 
  marginBottom: 7,
},
stepsbtn:{
  padding: 10,
  paddingLeft: 15,
  borderRadius: 100,
  borderWidth: 4,
  borderBottomWidth: 7,
  alignItems: 'center',
  justifyContent: 'center'
}

});


