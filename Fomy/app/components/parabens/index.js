
import { StyleSheet, Text, View, Image,FlatList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Feather } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, where, orderBy,documentId,doc, updateDoc, arrayUnion } from '@firebase/firestore'
import { app_DB, app_auth } from '../../../firebaseConfig';


export default function Parabens({navigation, route}){

  const Receita = route?.params.paramKey[1]
  const [XP, setXP] = useState()
  const [ExpAtual,setExpAtual] = useState()
  const [ReceitasFeitas, setReceitasFeitas] = useState([])
  console.log("Current recipe key: ",route?.params.paramKey[1])
  
  useEffect(()=>{
    handleUpdate()
    //Fiz com que ele só checasse XP da receita e ReceitasFeitas, sem verificar ExpAtual
    //Já que o ReceitasFeitas e ExpAtual mudam ao mesmo tempo...
    //Acho que isso arrumou o fato que ele rodava isso duas vezes antes, dando o dobro de xp na primeira vez que a pessoa fazia
  }, [XP, ReceitasFeitas])

  useEffect(()=>{
    const UserRef = collection(app_DB, 'Usuarios')
    const q = query(
        UserRef,
        where(documentId(), '==', app_auth.currentUser.uid)
    )

    const subscriver = onSnapshot(q, {
        next : (snapshot) => {
            const userq = []
            
            snapshot.docs.forEach(doc =>{   
                userq.push({
                    key : doc.id,
                    ...doc.data(),
                   
                })
            })
            setExpAtual(userq[0].Exp)
            setReceitasFeitas(userq[0].ReceitasFeitas)
            console.log()
            console.log("Current XP: ", userq[0].Exp)
            console.log()
            console.log("Recipes that the user did before: ", userq[0].ReceitasFeitas)
            console.log()
        }
    })

    return() => subscriver()

},[])

  
  useEffect(()=>{
    const XPRef = collection(app_DB, 'Receitas')
    const q = query(
        XPRef,
        where(documentId(), '==', route?.params.paramKey[1])
    )

    const subscriver = onSnapshot(q, {
        next : (snapshot) => {
            const exp = []
            
            snapshot.docs.forEach(doc =>{   
                exp.push({
                    key : doc.id,
                    ...doc.data(),
                   
                })
            })
            setXP(exp[0].Exp)
            console.log("Recipe xp: ", XP)
        }
    })

    return() => subscriver()

},[])




  const handleUpdate = async () => {
    //checa se tem algo para não atualizar o xp da pessoa com NaN ou undefined
    if (ExpAtual != undefined && XP != undefined && ExpAtual != NaN && XP != NaN){
      try{
        //checa se dentro do "mapa" de ReceitasFeitas tem a Receita que acabou de fazer
        var checkIfDid = false
        ReceitasFeitas.forEach((field) => {
          if(field.match(Receita)){
            checkIfDid = true
          }
        })


        //Sempre que ele faz pela primeira vez, ele faz isso duas vezes dando o dobro de xp
        //eu acho que o setState é tão FUCKING LENTO que precisa rodar DUAS VEZES para ele atualizar para tudo
        //UPDATE: (olha no primeiro useEffect)
        if(!checkIfDid){
          
            //Coloquei em uma variavel prq tava dando erro colocando dentro do UpdateDoc
            //Ou só foi um pequeno bug e isso n arrumou nada mas whatever quem liga
            var addExp = (ExpAtual + XP)

            try{
                console.log("------atualizou xp do perfil------\n\n")
                const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
                await updateDoc(userRef, {
                    ReceitasFeitas: arrayUnion(Receita),
                    Exp: addExp

                });
            } catch(error){
                console.log(error)
            }
          } else{
            //Ele tá mandando isso até na primeira vez, mas eu n ligo prq tá funcionando :)
            console.log("esse maluquinho realmente acha que pode farmar xp LOL!!!")
          }
      } catch(error) {
        console.log("esse try só checa por erro de lógica:")
        console.log(error)
      }
    } else{
      console.log("Tentou mas n foi prq é burro, que imbecil...")
    }
};

    return (
        <SafeAreaView style={styles.container}>
         <ScrollView>
           <ImageBackground style={styles.imagebak} source={require('../../assets/Group171.png')}>
             <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.goback} ><Feather name="chevron-left" color={"black"} size={40} /></TouchableOpacity>
             <View style={styles.areatitulo}>
               <Text style={styles.titulopasso}>PARABÉNS!!</Text>
               
             </View>
           </ImageBackground>
           <View style={styles.belowimage} >
             <View style={styles.teacharea} >
               <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} />
               <Image style={styles.charsombra} source={require("../../assets/sombra.png")} />
             </View>
             <View>
                <Text style={styles.parabenstitulo}>AI SIM HEIN!!</Text>
                <Text style={styles.parabenstexto}>{route.params.paramKey[0]}</Text>
             </View>
             <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
             <View style={styles.butao}>
                <Text style={styles.textobutao}>Bora!</Text>
             </View>
             </TouchableOpacity>
           </View>
         </ScrollView>
        </SafeAreaView>  
)} 



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      display: 'flex',
      backgroundColor: "#FFF"
      
    },
    goback:{
      position: 'absolute', 
      zIndex: 99, 
      marginTop: 10, 
      marginLeft: 3
    },
    imagebak:{
      height: 210, 
      zIndex: 0,
      backgroundColor: 'white'
    },
    areatitulo:{
      width: '90%',
      height:75,
      borderRadius: 20,
      backgroundColor: '#5D875D',
      alignSelf: 'center',
      marginTop: 65,
      alignItems: 'center',
      justifyContent: 'center'
    },
    titulopasso:{
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#FFFFFF',
  
    },
    belowimage:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 150,
      backgroundColor: "#FFF"
    },
    teacharea:{
      width: '90%',
      alignItems: 'center'
      
    },
    charimage:{
      height: 300,
      width: 244,
      marginTop: -210,
      zIndex: 3
    },
    charsombra:{
        height: 42,
        width: 192.40,
        position: 'absolute',
        zIndex: 1,
        // backgroundColor: 'red',
        right: 90,
        top: 50

        
    },
    parabenstitulo:{
        color: '#427643',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 30,


    },
    parabenstexto:{
       fontSize: 20,
       textAlign:'center'
    },
    butao:{
        backgroundColor: '#FAB151',
        height: 60.53,
        width:348.62,
        borderRadius: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 60
    },
    textobutao:{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: '4%'
    }
   
  
  });