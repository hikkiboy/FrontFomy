// import { Text, StyleSheet, View, FlatList, TouchableOpacity, Animated } from 'react-native'
// import React, { Component, useState, useEffect, useRef } from 'react'
// import { collection, onSnapshot, query, where, orderBy,documentId, collectionGroup } from '@firebase/firestore'
// import { app, app_DB } from '../../../../firebaseConfig'
// import Element from './BottomIndicatorElement'

// export default function PassoBottomIndicator (chave) {
//     const [Receitas, setReceitas] = useState([]);
//     const scrollX = useRef(new Animated.Value(0)).current
//     const [currentIndex, setcurrentIndex] = useState(0)

//     const viewableItemChanged = useRef(({viewableItems}) => {
//         setcurrentIndex(viewableItems[0].index)
//     }).current

    
//     const passoRef = useRef(null)

//     useEffect(()=>{
    
//         const receitaRef = collection(app_DB,`Receitas/9JAbSil0wA8ovapNgG11/Passos`)
//         const q = query(
//         receitaRef,
//         )
//           const subscriver = onSnapshot(q, {
//             next : (snapshot) => {
//               const receitas = []
//               snapshot.docs.forEach(doc =>{
//                 receitas.push({
//                   key : doc.id,
//                   ...doc.data(),
//                 })
//               })
//               setReceitas(receitas)
//               console.log(chave)
//             }
//           })
//           return() => subscriver()
//       },[])


//     return (
//       <View>
//         <View style={styles.passoAtualArea}>
//             <Element data = {Receitas} />
//           <FlatList nestedScrollEnabled
//             horizontal
//             data={Receitas}
//             keyExtractor={(item) => item.key}
//             bounces = {false}
//             showsHorizontalScrollIndicator = {false}
//             scrollEventThrottle={32}
//             renderItem={({item, index}) => (
//                 <View style={styles.containtraco}> 
              
//                 {/* {Receitas[Receitas.indexOf(item)].Sequencia != 1 &&
//                 <View style={styles.traco}/>
//                 } */}
//                 {/* <Button onPress={() => console.log(index )}/> */}
                
//                   <View style={[styles.passoAtual]}/>
                    
//                 </View>
//             )}
//             onScroll={Animated.event([{
//                 nativeEvent:{contentOffset : {x:scrollX}}
//             }],{
//                 useNativeDriver: false
//             })}
//             onViewableItemsChanged={viewableItemChanged}
//             ref = {passoRef}
//             />
//             </View>

//       </View>
//     )
//   }


// const styles = StyleSheet.create({
//     passoAtualArea:{
//         width: '100%',
//         height: 130,
//         backgroundColor: 'white',
//         borderColor: '#E5E5E5',
//         borderWidth: 5,
//         borderRadius: 6,
//         alignItems: 'center',
//         zIndex: 9,
//         borderTopWidth: 8,
//         borderRightWidth: 0,
//         borderLeftWidth: 0,
//         borderBottomWidth: 0,
//         marginTop: -50
//       },
//       passoAtual:{
//         width: 70,
//         height: 70,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#62BC63',
//         borderRadius: 10,
//         margin: 10,
//         borderColor: '#4A8E4B',
//         borderWidth: 4,
//         borderBottomWidth: 8,
    
    
//       },
//       passoAtualTexto:{
//         color: 'white',
//         fontSize: 40,
//         fontWeight: 'bold' ,
//         zIndex: 9
//       },
//       traco:{
//         backgroundColor: '#F2F2F2',
//         width: 90,
//         height: 10,
//         borderRadius: 90,
//         alignSelf: 'center'
//       },
//       containtraco:{
//         justifyContent: 'center',
//         flexDirection: 'row'
//       }
    
// })