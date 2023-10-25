import { View, Text, Image, useWindowDimensions, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native'
import * as Progress from 'react-native-progress' 
import {useEffect, useState} from 'react'
import { doc , collection, query, where, onSnapshot, Firestore, documentId, orderBy} from 'firebase/firestore'
import { app_auth, app_DB } from '../../../firebaseConfig'
import Animated, { Extrapolate, interpolate, useAnimatedRef, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Trilha from '../trilha'



const OnboardingItem = ({item, navigation, index, x}) => {

    
    const [Usuarios, setUsuarios] = useState([]);

    useEffect(()=>{

        
    
        const receitaRef = collection(app_DB, 'Usuarios')
    
        const q = query(
            receitaRef,
            where(documentId(), '==', app_auth.currentUser.uid)
            
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const receitas = []
                
                snapshot.docs.forEach(doc =>{   
                    receitas.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setUsuarios(receitas)
                //console.log(receitas)
                //console.log(receitaRef)

    
            }
        })
    
        return() => subscriver()
    
    },[])
    
    //console.log(Usuarios[0].ProgressoTrilhas);

    const {width} = useWindowDimensions()
    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [
                (index -1 ) * width,
                index * width,
                (index + 1)*width,
            ],
            [1,4,4],
            Extrapolate.CLAMP
        )
        return{
            transform: [{scale: scale}]
        }
    })

  return (
    <View style = {[styles.container, {width}]}>
       
       {/* controle da animação do fundo não mexe nisso */}
        <View style={styles.circleContainer}>
            <Animated.View style={[{
            width: width, 
            height:width,
            backgroundColor: item.Cor,
            borderRadius: width/2
            }, circleAnimation]} />
        </View>

        {/* a estilização acontece daqui pra baixo */}

        <Image source={require("../../assets/alberto.png")} style={[styles.mascote, {width, resizeMode:'center'}]}/>

        <View style={{flex: 0.3}}>
        <Text style = {styles.title}>{item.NomeTrilha}</Text>
        <Text style = {styles.description}>{item.Descricao}</Text>
        
        {/* <Progress.Bar style={styles.barra} unfilledColor='white' borderColor='black'   progress={Usuarios[0].ProgressoTrilhas[item.indexTrilha]}  width={250} height={20} color='#32a852'><Text style={{position:'absolute', flex:0, alignSelf: 'center'}}>{Usuarios[0].ProgressoTrilhas[item.indexTrilha] * 10} / {item.NumeroReceitas}</Text></Progress.Bar> */}
        <TouchableOpacity style = {styles.buttonRegistro} title = 'Registrar' onPress={ () => navigation.navigate("Trilha", {paramKey:[item.NomeTrilha, item.Descricao]})} >
          <Text style={[styles.botaoTexto]}>Entrar</Text>
          </TouchableOpacity>
        </View>
    </View>
    

  ) 
}
export default OnboardingItem

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        textAlign:'center',
    },
    description:{
        fontWeight: '300',
        fontSize: 20,
        textAlign:'center',
        paddingHorizontal: 64
    },
    mascote:{
        flex: 0.7,
        justifyContent: 'center',
    },
    itemContainer:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 120,
        marginTop: 200
    },
    circleContainer:{
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent:'flex-end',

    },
    buttonRegistro:{
            backgroundColor: "#7EB77F",
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "bold",
            padding: 13,
            paddingLeft: 40,
            paddingRight: 40,
            borderColor: "black",
            borderWidth: 3,
            marginTop: 20,
            marginBottom: 5,
            borderRadius: 10,
            width: 250,
    },
    botaoTexto:{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    barra:{
        alignSelf: 'center',
        marginBottom:10

    }

})


