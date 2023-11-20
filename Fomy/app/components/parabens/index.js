
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Feather } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, where, orderBy,documentId } from '@firebase/firestore'
import { app_DB } from '../../../firebaseConfig';


export default function Parabens({navigation, route}){

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
                <Text style={styles.parabenstexto}>{route.params.paramKey}</Text>
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