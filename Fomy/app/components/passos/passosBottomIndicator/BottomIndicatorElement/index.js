// import { View, Text, StyleSheet,Animated } from 'react-native'
// import React from 'react'

// export default function Element({data, scrollX}) {
    
//   return (
//     <View style={styles.passoAtualArea}>
//       {data.map((_,i) => {
//         const inputRange = [(i - 1) * 80, i * 80, (i + 1) * 80]

//         const passoWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [10,20,10],
//             extrapolate: 'clamp'
//         })


//         return (
//             <><Animated.View style={styles.passoAtual}>
//                 <Text style={styles.passoAtualTexto}>{data[i].Sequencia}</Text>
//             </Animated.View>
//             <View style={styles.traco} /></>
//         )  
//       })} 
//     </View>
//   )
// }

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
//         marginTop: -50,
//         flexDirection: 'row'
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