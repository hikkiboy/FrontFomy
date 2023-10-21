import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'
import { LoadProfile } from '../../components/loadprofile'


import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = ({navigation}) => {

    const [Receitas, setReceitas] = useState([]);

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
                setReceitas(receitas)
                console.log(receitas)
                console.log(receitaRef)

    
            }
        })
    
        return() => subscriver()
    
    },[])
    

    return (
        
        <SafeAreaView>
            
            <View>
                <FlatList
                style={styles.container}
                data={Receitas}
                renderItem={({item}) => (
                    <LoadProfile data={item} />
                )}
                />
            </View>       
           {/*<View>
                 <Button onPress={() =>{app_auth.signOut()}} title = "Sair"/>
                  /*<Button onPress={() => navigation.navigate('Fetch')} title = "Trilhas"/>*/
            }
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{

    },
    backgroundPfp:{
        height: '60%',
        backgroundColor: "#7EB77F"

    },
    pfp:{
        width: '50%',
        height: '50%'
    }
})

export default Profile