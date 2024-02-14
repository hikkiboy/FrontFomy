import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'

export function Badges({ data }) {
    const [Insignias, setInsignias] = useState([]);
    const [visible, setVisible] = useState(false)
    
    const height = Dimensions.get("window").height
    const [stuffHeight, setStuffHeight] = useState(85)
    const [imageHeight, setImageHeight] = useState(225.05)
    const [imageWidth, setImageWidth] = useState(207.2)
    const [fontSize, setFontSize] = useState(23)
    const [googleHeight, setGoogleHeight] = useState(32)
    const [googleWidth, setGoogleWidth] = useState(32)
    const [ tinyText, setTinyText ] = useState(23);

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
                console.log(Insignias)
                console.log("oii");


    
            }
        })
    
        return() => subscriver()
    }
    
    }
    ,[])

    
  useEffect(() => {
    if(height <= 700){
      //console.log("tela pequena")
      //console.log(height)
      setStuffHeight(75)
      setImageHeight(180.04)
      setImageWidth(165.76)
      setFontSize(18)
      setGoogleHeight(26)
      setGoogleWidth(26)
      setTinyText(21)
    }
  })

    return(
        <View style={[styles.container, { height: stuffHeight }]} >
            <FlatList
                data={Insignias}
                numColumns={3}
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
        marginTop: 15,
    },
    image:{
        width: 110,
        height: 115,
        marginHorizontal: 5
    },
    thebadge:{
        alignItems: 'center',
    },
    text:{
        fontSize: 16,
        fontWeight: '500',
        width: 110,
        textAlign: 'center',
        position: 'absolute',
        marginTop: 125
    }

})