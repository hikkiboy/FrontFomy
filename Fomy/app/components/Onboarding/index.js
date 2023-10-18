import { View, Text, Image, useWindowDimensions, StyleSheet, Button} from 'react-native'
import React from 'react'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { BlurMask, center } from '@shopify/react-native-skia';


const OnboardingItem = ({item, navigation}) => {

    const {width} = useWindowDimensions()

  return (
    <View style={[styles.container, {width}]}>
    <View style={styles.block}>
      
      <Image source={require('../../assets/alberto.png')} style={styles.mascote}/>
      
        <Text style={styles.title}>{item.NomeTrilha}</Text>
        <Text>{item.Descricao}</Text>
       
        <Button title='Entrar' onPress={navigation.navigate}/>
   
    </View>

    </View>
   

  ) 
}
export default OnboardingItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContents: 'center',
        alignItems: 'center',
    },
    image:{
        flex:0.7,
        width: 400,
        height: 400,
        justifyContent:'center',
    },
    title:{
        fontWeight: '800',
        fontSize: 28,
        marginBottom:10,
        textAlign:'center',
        marginTop: -90
    },
    description:{
        fontWeight: '300',
        fontSize: 28,
        paddingHorizontal:64,
        textAlign:'center'
    },
    mascote:{
        height: 400,
        width: 400,
        resizeMode: 'center',
        alignSelf: 'center',
        marginTop: -100
    },
    block:{
        height:200,
        width: 200,
        backgroundColor:'black',
        marginTop: 160
    }
})


