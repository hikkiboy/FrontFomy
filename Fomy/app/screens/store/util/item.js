
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, app_DB, app_auth } from '../../../../firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, documentId, FieldValue,arrayUnion,updateDoc, doc, getDoc } from '@firebase/firestore'
import { Button } from 'react-native-elements'


export default function Item() {
  return (
    <View style={{marginTop: 100}}>
      <Button title = "debug" onPress={() => porra(key = "3")}></Button>
    </View>
  )
}

async function porra(key){
    const DocRef = doc(app_DB,"Itens",key)
    const DocSnap = await getDoc(DocRef)
    const funny = DocSnap.data()
    console.log(funny)
    return funny
}
