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


export default function Preparo({route, props, navigation}) {


  const [Receitas, setReceitas] = useState([]);
  const [visible, setVisible] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null);

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
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 99 }}>
        <FontAwesome size={30} color={"#FFF"} name='arrow-left' style={[styles.backicon, { backgroundColor: route.params.paramKey[1] }]} />
      </TouchableOpacity>
      <ScrollView>
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
        <View style={[styles.bgimg, {backgroundColor: route.params.paramKey[1]}]} >
          <View style={ styles.titlearea }>
            <View style={ styles.title }>
              <Text style={styles.titletxt}>{route.params.paramKey[0]}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text style={[styles.titletxt, {marginRight: 11,}]}>1</Text>
                <FontAwesome5 name='user-alt' size={17} color={"#FFF"} />
              </View>
            </View>
          </View>
          <Image 
            source={{ uri: route.params.paramKey[2] }} 
            style={styles.image}
          />
          <View style={[{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, zIndex: 1, position: 'absolute', borderBottomWidth: 8, borderWidth: 5, borderColor: "rgba(0,0,0,0.25)" }]} ></View>
        </View>
      
        <FlatList nestedScrollEnabled
          data={Receitas}
          scrollEnabled = {true}
          showsVerticalScrollIndicator ={false}
          renderItem={({item}) => (
            <View style={styles.container}>


    
              {/* <Button onPress={() => console.log(item)}></Button> */}
              <View style={styles.Ingredientesbg}>
                <Text style={styles.IngredientesTexto}>Ingredientes</Text>
              </View>

              <Text style={{opacity: 0, position: 'absolute'}}>{arrayIng.push(item.Ingredientes)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayBon.push(item.Bonus)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayUtil.push(item.Utensilios)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayprep.push(item.PassosSimp)}</Text>
              <Text style={{opacity: 0, position: 'absolute'}}>{arrayporc.push(item.Porcoes)}</Text>

              <View style={styles.IngredientesContain}>
                  <Image style={styles.Cesta} source={require('../../assets/Cesta.png')}/>
                  <FlatList nestedScrollEnabled
                    data={arrayIng[0]}
                    scrollEnabled = {true}
                    showsVerticalScrollIndicator = {false}
                    renderItem={({item}) => (
                      <View>
                        <View style={styles.IngredientesNumContain}>
                          <Text style={styles.NumeroIngrediente}>*</Text>
                          <Text style = {styles.Ingredientes}>{item}</Text>
                        </View>
                        <View style={{marginStart: 50, marginBottom: 10, marginTop: -12, backgroundColor: '#2F8CE4', borderRadius: 20, width: "80%", height: 7 }} />
                      </View>
                    )}
                  />

                {arrayBon.includes(undefined) != true && (
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
                )}
              
      
                <View style={styles.UtilBG}>
                  <Text style={styles.UtilTexto}>Utensílios</Text>
                </View>
                <Image style={styles.Ovo} source={require('../../assets/Uten.png')}/>
                <FlatList nestedScrollEnabled
                  data={arrayUtil[0]}
                  scrollEnabled = {true}
                  showsVerticalScrollIndicator = {false}
                  renderItem={({item}) => (
                    <View>
                      <View style={styles.BonusNumContain}>
                          <Text style={styles.NumeroIngrediente}>*</Text>
                          <Text style = {styles.Ingredientes}>{item}</Text>
                      </View>
                      <View style={{marginStart: 50, marginBottom: 10, marginTop: -12, backgroundColor: '#2F8CE4', borderRadius: 20, width: "80%", height: 7 }} />
                    </View>
                  )}
                />
              </View>
              <View>
                <View>
                  <Image style={styles.Pote} source={require('../../assets/Pote_preparo.png')}/>
                    <View style={{display: 'flex', flexDirection: 'row', alignContent:'center'}}>
                      <View style={styles.ModoPreparoBG}>
                        <Text style={styles.ModoPreparo}>MODO DE FAZER</Text>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate('Passos',{paramKey:[item.key]})}>
                        <Image style={styles.ButtonPlay} source={require('../../assets/playbutt.png')}/>
                      </TouchableOpacity>
                    </View>
                </View>
                <FlatList nestedScrollEnabled
                  data={arrayprep[0]}
                  scrollEnabled = {true}
                  showsVerticalScrollIndicator = {false}
                  renderItem={({item}) => (
                    <View style={styles.ModoPreparoContain}>
                        <Text style={styles.Passo}>• </Text>
                        <Text style = {styles.PassoDesc}> {item}</Text>
                    </View>
                  )}
                />
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
    backgroundColor: '#FFF'
    
  },
  backicon:{
    padding: 7, 
    paddingHorizontal: 9, 
    position: 'absolute', 
    zIndex: 99, 
    top: 10, 
    left: 8, 
    borderRadius: 100
  },
  bgimg:{
    width: "100%",
    alignItems: 'center',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    marginBottom: 49
  },
  titlearea:{
    width: '100%',
    paddingStart: 30,
    paddingEnd: 30,
    marginTop: 55,
    zIndex: 98
  },
  title:{
    borderRadius: 25,
    borderWidth: 4,
    borderBottomWidth: 8,
    paddingVertical: 3,
    borderColor: "rgba(0,0,0,0.25)",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingStart: 17,
    paddingEnd: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titletxt:{
    maxWidth: '75%',
    fontWeight: 'bold',
    fontSize: 22,
    color: "#FFF"
  },
  image:{
    height: 100, 
    width: 100,
    marginVertical: 34,
    zIndex: 98
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
    backgroundColor: "#2F8CE4",
    width: '90%',
    borderRadius: 100,
    borderColor: '#296CAA',
    borderWidth: 5,
    borderBottomWidth: 9,
    paddingVertical: 4,
    alignSelf: 'center'

},
IngredientesTexto:{
    fontSize: 22,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold'
},
IngredientesContain:{
    width: '100%',
},
IngredientesNumContain:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingStart: 20
},
NumeroIngrediente:{
  fontSize: 30,
  fontWeight: 'bold',
  color: '#2F8CE4'
},
Ingredientes:{
    fontWeight: 'bold',
    fontSize: 20,
    maxWidth: '80%',
    height: '100%',
    marginTop: 30,
    marginLeft: 15,
    textDecorationColor: '#2F8CE4'
},
Cesta:{
  height: 100,
  width: 100,
  alignSelf: 'center',
  marginTop: 40,
  marginBottom: 20
},
BonusBg:{
  backgroundColor: "#FAB151",
  width: '90%',
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
Ovo:{
  height: 100,
  width: 100,
  alignSelf: 'center',
  marginTop: 40,
  marginBottom: 20
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
ModoPreparo:{
textAlign: 'center',
alignSelf: 'center',
fontWeight: 'bold',
fontSize: 30,
color: '#365336'
},
ModoPreparoBG:{
  backgroundColor: "#7EB77F",
  width: '77%',
  borderRadius: 20,
  marginLeft: 30,
  marginTop: '3%',
  alignSelf: 'flex-start',
  marginTop:25,
  alignSelf: 'center',
  marginBottom: 25
},
Pote:{
  alignSelf: 'center',
  marginBottom: -24,
  height: 70,
  width: 70,
  marginTop: 45
},
UtilTexto:{
  fontSize: 22,
  textAlign: 'center',
  color: '#FFF',
  fontWeight: 'bold'
},
UtilBG:{
  backgroundColor: "#2F8CE4",
  width: '90%',
  borderRadius: 100,
  borderColor: '#296CAA',
  borderWidth: 5,
  borderBottomWidth: 9,
  paddingVertical: 4,
  marginTop: 60,
  alignSelf: 'center'
},
ModoPreparoContain:{
  marginLeft: 30,
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'center',
  marginBottom: 5
},
PassoDesc:{
  fontWeight: 'bold',
  fontSize: 20,
  width: 300,
  height: '100%',
  color: '#7EB77F'
},
Passo:{
  fontSize: 20,
  fontWeight: 'bold',
  color: '#000000'
},
ButtonPlay:{
  width: 41,
  height: 41,
  marginLeft: 10,
  marginTop:25,
},

});


