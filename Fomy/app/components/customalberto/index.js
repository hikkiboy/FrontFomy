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
          <Image resizeMode='center' style={styles.AlbertoTop} source={{uri: itens.itens[0].Itens[itens.itemAtualCabeça]}}/>
          <Image resizeMode='center' style={styles.AlbertoMiddle1} source={{uri: itens.itens[0].Itens[itens.itemAtualOlhos]}}/>
          <Image resizeMode='center' style={styles.AlbertoMiddle2} source={{uri: itens.itens[0].Itens[itens.itemAtualBoca] }}/>
          <Image resizeMode='center' style={styles.AlbertoBottom} source={{uri: itens.itens[0].Itens[itens.itemAtualCorpo]}}/>
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
    backgroundColor: 'red',
    width: 200,
    height: '50%',
    zIndex: 1
  },
  AlbertoMiddle1:{
    top: -30,
    alignSelf: 'center',
    backgroundColor: 'red',
    width: 200,
    height: 100,
    zIndex: 1
  },
  AlbertoMiddle2:{
    top: -30,
    alignSelf: 'center',
    backgroundColor: 'red',
    width: 200,
    height: 100,
    zIndex: 1
  },
  AlbertoBottom:{
    top: -50,
    alignSelf: 'center',
    backgroundColor: 'red',
    width: 200,
    height: 100,
    zIndex: 1
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
