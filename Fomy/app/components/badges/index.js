import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'

export function Badges({ data }) {
    const [Insignias, setInsignias] = useState([]);

    useEffect(()=>{

        
    
        const insigniasRef = collection(app_DB, 'Insignias')
    
        const q = query(
            insigniasRef,
            where(documentId(), 'in', data.Insignias)
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const insignias = []
                
                snapshot.docs.forEach(doc =>{   
                    insignias.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setInsignias(insignias)
                console.log(Insignias)


    
            }
        })
    
        return() => subscriver()
    
    },[])

    return(
        <View>
            <FlatList
                data={Insignias}
                renderItem={({item}) => {
                    return( <Image source={{ uri: item.Imagem }} style={styles.image} />)
                }}
                keyExtractor={item => item.key}
            />

        </View>
    )




}

const styles = StyleSheet.create({
    container:{

    },
    image:{
        width: 40,
        height: 40
    }

})