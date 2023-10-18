import { View, Text, Image, useWindowDimensions, StyleSheet} from 'react-native'
import React from 'react'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useState, useEffect } from 'react';

export default OnboardingItem = ({item}) => {

    const {width} = useWindowDimensions()

  return (
    <View style={[styles.container, {width}]}>
     <Image source={{uri: item.Imagem}}
    style = {[styles.image, {width, resizeMode: 'contain'}]}/>
    <View style = {{flex: 0.3}}> 
        <Text style={styles.title}>{item.NomeTrilha}</Text>
        <Text>{item.Descricao}</Text>
    </View>
    </View>

  ) 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContents: 'center',
        alignItems: 'center'
    },
    image:{
        flex:0.7,
        width: 400,
        height: 400,
        justifyContent:'center'
    },
    title:{
        fontWeight: '800',
        fontSize: 28,
        marginBottom:10,
        textAlign:'center'
    },
    description:{
        fontWeight: '300',
        fontSize: 28,
        paddingHorizontal:64,
        textAlign:'center'
    }
})


