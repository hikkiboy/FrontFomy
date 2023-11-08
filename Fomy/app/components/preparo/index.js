import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image,FlatList,TouchableWithoutFeedback } from 'react-native';
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
      or (where("Nome", "==", route.params.paramKey[0]), 
      where("Passos", "==", "1"))
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
let arrayIng = []
let arrayBon = []
let arrayUtil = []
  return (
    <SafeAreaView style={styles.container} >
      
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
<View style={styles.bgpfp} >
    </View>
      <FlatList
      data={Receitas}
      scrollEnabled = {true}
      showsVerticalScrollIndicator ={false}
      
      renderItem={({item}) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.nomebg}>
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
            <Button onPress={() => console.log(item)}></Button>
        <View style={styles.IngredientesContain}>
            <FlatList
            data={arrayIng[0]}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
              <View>
                <View style={styles.IngredientesNumContain}>
                    <Text style={styles.NumeroIngrediente}>{arrayIng[0].indexOf(item ) + 1}-</Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
                </View>
              </View>
            )}
            
            />
            <View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image style={styles.Ovo} source={require('../../assets/Ovo_leite.png')}/>
              <View style={styles.BonusBg}>
              <Text style={styles.BonusTexto}>Bônus</Text>
              </View> 
              </View>
              <View>
              <Text style={styles.BonusSubTit}>Ingredientes adicionais para aprimorar sua receita!! Desbloqueio ápos fazer a versão simples da receita</Text>
              </View>
            </View>
             <FlatList
            data={arrayBon[0]}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={styles.BonusNumContain}>
                    <Text style={styles.NumeroIngrediente}>{arrayBon[0].indexOf(item) + 1}°</Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
                </View>
            )}
            />
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image style={styles.Ovo} source={require('../../assets/Uten.png')}/>
              <View style={styles.UtilBG}>
              <Text style={styles.UtilTexto}>Utensílios</Text>
              </View>
            </View>
             <FlatList
            data={arrayUtil[0]}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={styles.BonusNumContain}>
                    <Text style={styles.NumeroIngrediente}>{arrayUtil[0].indexOf(item) + 1}°</Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
                </View>
            )}
            />
        </View>
        <View>
        <Image style={styles.Pote} source={require('../../assets/Pote_preparo.png')}/>
          <View style={styles.ModoPreparoBG}>
          <Text style={styles.ModoPreparo}>MODO DE PREPARO</Text>
          </View>
          <FlatList
            data={arrayUtil[0]}
            scrollEnabled = {true}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={styles.BonusNumContain}>
                    <Text style={styles.NumeroIngrediente}>{arrayUtil[0].indexOf(item) + 1}°</Text>
                    <Text style = {styles.Ingredientes}> {item}</Text>
                </View>
            )}
            />
        </View>
        
     </SafeAreaView>
      )}
      />
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
    height: '30%',
    backgroundColor: "#7EB77F",
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
  color: '#FF595E'
},
Ingredientes:{
    fontWeight: 'bold',
    fontSize: 20,
    width: 300,
    height: '100%',
    marginTop: 30

    
},
Cesta:{
  marginRight: 10,
  marginLeft: 5,
  height: 43,
  width: 43
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
fontWeight: 'bold'
},
BonusSubTit:{
  width: 400,
  opacity: .5
},
Ovo:{
  width: 41,
  height: 41,
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
  marginLeft: -5,
  marginTop: '3%',
  alignSelf: 'flex-start',
  marginTop:25,
  alignSelf: 'center'
},
Pote:{
  alignSelf: 'center',
  marginBottom: -25,
  height: 45,
  width: 45
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


