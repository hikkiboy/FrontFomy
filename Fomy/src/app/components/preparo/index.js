import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { app, app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, ListItem } from 'react-native-elements';


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
<View style={[styles.bgpfp, {backgroundColor: route.params.paramKey[1],}]} >
    
      <Image 
      tintColor={"#FFF"}
      source={{ uri: route.params.paramKey[2] }} 
      style={{height: 100, width: 100, marginTop: 50}}
      />
    </View>
      
      <FlatList nestedScrollEnabled


      data={Receitas}
      scrollEnabled = {true}
      showsVerticalScrollIndicator ={false}
      
      
      renderItem={({item}) => (
    <SafeAreaView style={styles.container}>


    
      {/* <Button onPress={() => console.log(item)}></Button> */}
        <View style={[{
              backgroundColor: route.params.paramKey[1],
              width: '70%',
              borderRadius: 100,
              marginTop: '3%',
              marginBottom: '2%',
              alignSelf: 'center'
        }]}>
        <Text style={styles.nomeTexto}>{item.Nome}</Text>
        </View>
        <View style={styles.ContainTextAndIcon}>
        <Image style={styles.Cesta} source={require('../../assets/Cesta.png')}/>
        <View style={styles.Ingredientesbg}>
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
              <View>
                <View style={styles.IngredientesNumContain}>
                <Text style={styles.NumeroIngrediente}>{arrayIng[0].indexOf(item) + 1}-</Text>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginRight:-5}}>
                      </Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
                </View>
              </View>
            )}
           
            />
             {arrayBon.includes(undefined) != true && (
              <>
              <View>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 30}}>
              <Image style={styles.Ovo} source={require('../../assets/Ovo_leite.png')}/>
              <View style={styles.BonusBg}>
              <Text style={styles.BonusTexto}>Bônus</Text>
              </View> 
              </View>
              <View>
              <Text style={styles.BonusSubTit}>Ingredientes adicionais para aprimorar sua receita!! Desbloqueio ápos fazer a versão simples da receita</Text>
              </View>
            </View>

             <FlatList nestedScrollEnabled
            data={arrayBon[0]}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={styles.BonusNumContain}>
                    <Text style={styles.NumeroBonus}>{arrayBon[0].indexOf(item) + 1}-</Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
                </View>
            )}
            />
            </>
              )}
            
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 30}}>
            <Image style={styles.Ovo} source={require('../../assets/Uten.png')}/>
              <View style={styles.UtilBG}>
              <Text style={styles.UtilTexto}>Utensílios</Text>
              </View>
            </View>
             <FlatList nestedScrollEnabled
            data={arrayUtil[0]}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={styles.BonusNumContain}>
                    <Text style={styles.NumeroIngrediente}>{arrayUtil[0].indexOf(item) + 1}-</Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
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
        
     </SafeAreaView>
     
      )}
      /></ScrollView>
       </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    
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
  bgpfp:{
    height: 170,
    width: 393,
    alignItems: 'center',
    paddingBottom: 40,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20
},
nomebg:{
    backgroundColor: "#7EB77F",
    width: '70%',
    borderRadius: 100,
    marginTop: '3%',
    marginBottom: '2%',
    alignSelf: 'center'
},
Ingredientesbg:{
    backgroundColor: "#DBEBFA",
    width: '33%',
    borderRadius: 100,
    marginLeft: -5,
    marginTop: '3%',
    alignSelf: 'flex-start',
    borderColor: '#2F8CE4',
    borderWidth: 3

},
IngredientesTexto:{
fontSize: 20,
textAlign: 'center',
color: '#1877D1',
fontWeight: 'bold'
},
nomeTexto:{
    fontWeight: 'bold',
    fontSize: 25,
    color: '#365336',
    textAlign: 'center'
},
IngredientesContain:{
    width: '30%',
    marginLeft: '20%',
    marginLeft: 14
},
IngredientesNumContain:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginLeft: 0,
  
},
BonusNumContain:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginLeft: 0,
  
},
NumeroIngrediente:{
  fontSize: 40,
  fontWeight: 'bold',
  color: '#1877D1',
  marginLeft: 10
},
Ingredientes:{
    fontWeight: 'bold',
    fontSize: 20,
    width: 300,
    height: '100%',
    marginTop: 30,
    marginLeft: 10
},
Cesta:{
  marginRight: 10,
  marginLeft: 10,
  height: 55,
  width: 55
},
ContainTextAndIcon:{
  display: 'flex',
  flexDirection: 'row'
},
BonusBg:{
  backgroundColor: "#f1e3cf",
  width: '77%',
  borderRadius: 100,
  marginLeft: -5,
  marginTop: '3%',
  alignSelf: 'flex-start',
  borderColor: '#FAB151',
  borderWidth: 3,
  marginTop:25
  
},
BonusTexto:{
  fontSize: 20,
textAlign: 'center',
color: '#FAB151',
fontWeight: 'bold',

},
BonusSubTit:{
  width: 400,
  opacity: .5
},
Ovo:{
  width: 50,
  height: 50,
  marginRight: 10,
  marginLeft: 5,
  marginTop:20
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
  fontSize: 24,
  textAlign: 'center',
  color: '#1877D1',
  fontWeight: 'bold',
},
UtilBG:{
  backgroundColor: "#DBEBFA",
  borderRadius: 100,
  marginLeft: -5,
  marginTop: '3%',
  alignSelf: 'flex-start',
  borderColor: '#2F8CE4',
  borderWidth: 3,
  marginTop:25,
  width: 150
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
NumeroBonus:{
  fontSize: 40,
  fontWeight: 'bold',
  color: '#FAB151',
  marginLeft: 10
}

});


