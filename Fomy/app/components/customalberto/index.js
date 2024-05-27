import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { app, app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, doc, getDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'


export default function AlbertoCustom({ width, height }) {

  const [aberto, setAberto] = useState()

  useEffect(() => {

    const receitaRef = collection(app_DB, 'Usuarios')

    const q = query(
      receitaRef,
      where(documentId(), '==', app_auth.currentUser.uid),

    )
    const subscriver = onSnapshot(q, {
      next: (snapshot) => {
        const receitas = []
        snapshot.docs.forEach(doc => {
          receitas.push({
            key: doc.id,
            ...doc.data(),

          })
        })
        setAberto(receitas)


      }
    })

    return () => subscriver()



  }, [])


  //console.log('Se leu, o alberto custom ta sendo usado');
  //console.log(aberto[0].ItensAli)


  return (
    <View style={{ width: width, height: height }}>
      {aberto != undefined && (
        <FlatList
          data={aberto[0].ItensAli}
          scrollEnabled={false}
          renderItem={({ item, index }) => (

            <View style={styles.containerAlberto} >
              {index == 0 && (<Image style={[styles.AlbertoTop, { width: width / 2, height: height * 0.4 }]} source={{ uri: item }} />)}
              {index == 1 && (<Image style={[styles.AlbertoMiddle1, { width: width / 2, height: height * 0.061 }]} source={{ uri: item }} />)}
              {index == 2 && (<Image style={[styles.AlbertoMiddle2, { width: width / 2, height: height * 0.04 }]} source={{ uri: item }} />)}
              {index == 3 && (<Image style={[styles.AlbertoBottom, { width: width / 2, height: height * 0.108 }]} source={{ uri: item }} />)}

            </View>

          )}
        />
      )}

    </View>

  );
}


const styles = StyleSheet.create({
  containerAlberto: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  AlbertoTop: {
    resizeMode: 'center',
    width: 250,
    height: 200,
    top: 1
  },
  AlbertoMiddle1: {
    width: 250,
    height: 31,
    resizeMode: 'center'
  },
  AlbertoMiddle2: {
    width: 250,
    height: 20,
    resizeMode: 'center'
  },
  AlbertoBottom: {
    width: 249,
    height: 54,
  },

});
