import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'

export function Badges({ data }) {
    const [Insignias, setInsignias] = useState([]);
    const [visible, setVisible] = useState(false)

    useEffect(()=>{

        if(data.Insignias[0] != "" ){
    
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
                //console.log(Insignias)


    
            }
        })
    
        return() => subscriver()
    }
    
    },[])

    return(
        <View style={styles.container} >
            <FlatList
                style={{ flexDirection: 'row', alignItems: 'center' }}
                data={Insignias}
                renderItem={({item}) => {
                    return(
                        <View style={styles.thebadge}>
                            <Image source={{ uri: item.Imagem }} style={styles.image} />
                        </View>
                   )
                    
                }}
                keyExtractor={item => item.key}
            />

        </View>
    )




}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    image:{
        width: 104,
        height: 109,
        marginHorizontal: 8
    },
    thebadge:{
        alignItems: 'center',
    },

})