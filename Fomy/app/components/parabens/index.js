
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Feather } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, where, orderBy,documentId,doc, updateDoc, arrayUnion } from '@firebase/firestore'
import { app_DB, app_auth } from '../../../firebaseConfig';


export default function Parabens({navigation, route}){

  const [Receita, setReceita] = useState()
  const [XP, setXP] = useState()
  const [ExpAtual,setExpAtual] = useState()
  const [ReceitasFeitas, setReceitasFeitas] = useEffect([])
  console.log(route?.params.paramKey[1])
  
  useEffect(()=>{
    setReceita(route?.params.paramKey[1])
    handleUpdate()
  }, [])

  useEffect(()=>{
    const XPref = collection(app_DB, 'Usuarios')
    const q = query(
        XPref,
        where(documentId(), '==', app_auth.currentUser.uid)
    )

    const subscriver = onSnapshot(q, {
        next : (snapshot) => {
            const exp = []
            
            snapshot.docs.forEach(doc =>{   
                exp.push({
                    key : doc.id,
                    ...doc.data(),
                   
                })
            })
            setExpAtual(exp[0].Exp)
            setReceitasFeitas(exp[0].ReceitasFeitas)
            console.log(ExpAtual)
        }
    })

    return() => subscriver()

},[])

  
  useEffect(()=>{
    const XPref = collection(app_DB, 'Receitas')
    const q = query(
        XPref,
        where(documentId(), '==', route?.params.paramKey[1])
    )

    const subscriver = onSnapshot(q, {
        next : (snapshot) => {
            const exp = []
            
            snapshot.docs.forEach(doc =>{   
                exp.push({
                    key : doc.id,
                    ...doc.data(),
                   
                })
            })
            setXP(exp[0].Exp)
            console.log(exp[0].Exp)
            console.log(XP)
        }
    })

    return() => subscriver()

},[])




  const handleUpdate = async () => {
    console.log("RECEITA DENTRO DO HANDLE:", Receita)
    if(true){
      
        try{
            const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
            await updateDoc(userRef, {
                ReceitasFeitas: arrayUnion(Receita),
                Exp: ExpAtual + XP

            });
        } catch(error){
            console.log(error)
        }
      }
};




    console.log(route?.params.paramKey)

    return (
        <SafeAreaView style={styles.container}>
         <ScrollView>
           <ImageBackground style={styles.imagebak} source={require('../../assets/Group171.png')}>
             <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.goback} ><Feather name="chevron-left" color={"black"} size={40} /></TouchableOpacity>
             <View style={styles.areatitulo}>
               <Text style={styles.titulopasso}>PARABÉNS!!</Text>
               
             </View>
           </ImageBackground>
           <View style={styles.belowimage} >
             <View style={styles.teacharea} >
               <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} />
               <Image style={styles.charsombra} source={require("../../assets/sombra.png")} />
             </View>
             <View>
                <Text style={styles.parabenstitulo}>AI SIM HEIN!!</Text>
                <Text style={styles.parabenstexto}>{route.params.paramKey[0]}</Text>
             </View>
             <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
             <View style={styles.butao}>
                <Text style={styles.textobutao}>Bora!</Text>
             </View>
             </TouchableOpacity>
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
      height:75,
      borderRadius: 20,
      backgroundColor: '#5D875D',
      alignSelf: 'center',
      marginTop: 65,
      alignItems: 'center',
      justifyContent: 'center'
    },
    titulopasso:{
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#FFFFFF',
  
    },
    belowimage:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 150,
      backgroundColor: "#FFF"
    },
    teacharea:{
      width: '90%',
      alignItems: 'center'
      
    },
    charimage:{
      height: 300,
      width: 244,
      marginTop: -210,
      zIndex: 3
    },
    charsombra:{
        height: 42,
        width: 192.40,
        position: 'absolute',
        zIndex: 1,
        // backgroundColor: 'red',
        right: 90,
        top: 50

        
    },
    parabenstitulo:{
        color: '#427643',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 30,


    },
    parabenstexto:{
       fontSize: 20,
       textAlign:'center'
    },
    butao:{
        backgroundColor: '#FAB151',
        height: 60.53,
        width:348.62,
        borderRadius: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 60
    },
    textobutao:{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: '4%'
    }
   
  
  });