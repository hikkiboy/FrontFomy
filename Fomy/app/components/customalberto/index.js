import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration,ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'


export function AlbertoCustom(itens, ItemAtualCabeça, ItemAtualOlhos, ItemAtualBoca, ItemAtualCorpo) {



  console.log('Se leu, o alberto custom ta sendo usado');
  console.log(itens.itens[0].Itens[0])
  return (
    <View>
      <View style={styles.containerAlberto}>
          <Image style={styles.AlbertoTop} source={{uri: itens.itens[0].Itens[itens.itemAtualCabeça]}}/>
          <Image style={styles.AlbertoMiddle1} source={{uri: itens.itens[0].Itens[itens.itemAtualOlhos]}}/>
          <Image style={styles.AlbertoMiddle2} source={{uri: itens.itens[0].Itens[itens.itemAtualBoca] }}/>
          <Image style={styles.AlbertoBottom} source={{uri: itens.itens[0].Itens[itens.itemAtualCorpo]}}/>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  containerAlberto:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  AlbertoTop:{
    alignSelf: 'center',
    width: 200,
    height: 130,
    resizeMode: 'stretch',
    marginBottom: -1
  },
  AlbertoMiddle1:{
    width: 200,
    height: 30,
    resizeMode: 'stretch'
  },
  AlbertoMiddle2:{
    width: 200,
    height: 20,
    resizeMode: 'stretch'

  },
  AlbertoBottom:{
    width: 200,
    height: 50,
    resizeMode: 'stretch'


  },
  butao:{
    top: -50
  },
  Titulo:{
    top: 55 ,
    width: 200,
    height: 100,
    marginBottom: 100,
  },
});
