import { View, Text, Image, useWindowDimensions, StyleSheet, Button} from 'react-native'
import * as Progress from 'react-native-progress' 
import {useEffect, useState} from 'react'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { app_auth, app_DB } from '../../../firebaseConfig'




const OnboardingItem = ({item, navigation}) => {

    
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

  return (
    <View style={[styles.container, {width}]}>
    <View style={styles.block}>
      
      <Image source={require('../../assets/alberto.png')} style={styles.mascote}/>
      
        <Text style={styles.title}>{item.NomeTrilha}</Text>
        <Text style={styles.description}>{item.Descricao}</Text>
        
        <View style={{paddingTop: 10, paddingBottom:20}}>
        {/*<Progress.Bar style={{alignSelf:'center'}} progress={Usuarios[0].ProgressoTrilhas[item.indexTrilha]} width={250} height={20} color='#32a852'><Text style={{position:'absolute', flex:0, alignSelf: 'center'}}>{Usuarios[0].ProgressoTrilhas[item.indexTrilha] * 10}/10</Text></Progress.Bar>*/}
        </View>
        <View>
        {/*<Button title='Entrar' onPress={navigation.navigate(item.NomeTrilha)}/>*/}
        </View>
   
    </View>

    </View>
   

  ) 
}
export default OnboardingItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContents: 'center',
        alignItems: 'center',
    },
    image:{
        flex:0.7,
        width: 400,
        height: 400,
        justifyContent:'center',
    },
    title:{
        fontWeight: '800',
        fontSize: 28,
        marginBottom:10,
        textAlign:'center',
        marginTop: -90
    },
    description:{
        fontWeight: '300',
        fontSize: 20,
        textAlign:'center'
    },
    mascote:{
        height: 400,
        width: 400,
        resizeMode: 'center',
        alignSelf: 'center',
        marginTop: -100
    },
    block:{
        height:200,
        width: 200,
        backgroundColor:'black',
        marginTop: 160
    },

})


