import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration,ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId,doc,getDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'


export default function  AlbertoCustom(itens, ItemAtualCabeça, ItemAtualOlhos, ItemAtualBoca, ItemAtualCorpo) {



  console.log('Se leu, o alberto custom ta sendo usado');


  return (
    <View>
      <View style={styles.containerAlberto}>
          {/* <Image style={styles.AlbertoTop} source={{uri: top}}/> */}
          {/* <Image style={styles.linha} source={require("../../assets/alberto.png")} /> */}

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
    resizeMode: 'center',
    width: 250,
    height: 200,
  },
  AlbertoMiddle1:{
    width: 250,
    height: 31,
    resizeMode: 'center'
  },
  AlbertoMiddle2:{
    width: 252,
    height: 20,
    resizeMode: 'center'
  },
  AlbertoBottom:{
    width: 249,
    height: 54,



  },
  butao:{
    top: -50
  },

});
