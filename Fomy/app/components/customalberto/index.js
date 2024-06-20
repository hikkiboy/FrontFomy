import { View, Image } from 'react-native';
import { app_DB, app_auth } from '../../../firebaseConfig'
import { collection, onSnapshot, query, where, documentId } from '@firebase/firestore'
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
        <View>
          <Image style={{ width: width, height: height, resizeMode: 'contain', zIndex: 0 }} source={ aberto[0].ItensAli[0] === "chef" ? require('../../assets/betterAlbertoForCustomization.png') : require('../../assets/nakedAlberto.png')} />
          <Image style={{ width: width, height: height, resizeMode: 'contain', position: 'absolute', zIndex: 1 }} source={{ uri: aberto[0].ItensAli[0] }} />
          <Image style={{ width: width, height: height, resizeMode: 'contain', position: 'absolute', zIndex: 2 }} source={{ uri: aberto[0].ItensAli[1] }} />
          <Image style={{ width: width, height: height, resizeMode: 'contain', position: 'absolute', zIndex: 3 }} source={{ uri: aberto[0].ItensAli[2] }} />
          <Image style={{ width: width, height: height, resizeMode: 'contain', position: 'absolute', zIndex: 4 }} source={{ uri: aberto[0].ItensAli[3] }} />
        </View>
      )}

    </View>

  );
}
