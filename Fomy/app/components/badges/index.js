import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, Modal} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'
import { ModalBadge } from '../actionmodal/modalbadge'

export function Badges({ data }) {
    const [Insignias, setInsignias] = useState([]);
    const [visible, setVisible] = useState(false)
    
    const height = Dimensions.get("window").height
    const width = Dimensions.get("window").width
    const [imageHeight, setImageHeight] = useState(109.25)
    const [imageWidth, setImageWidth] = useState(104.5)
    const [margin, setMargin] = useState(12)
    const [selectedBadge, setSelectedBadge] = useState()

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


    
            }
        })
    
        return() => subscriver()
    }
    
    }
    ,[])

    
  useEffect(() => {
    if(width <= 400){
      //console.log("tela pequena")
      //console.log("height: ",height)
      //console.log("width: ",width)
      setImageHeight(97.75)
      setImageWidth(93.5)
    } else {
        //console.log("tela grande");
        //console.log("height: ",height)
        //console.log("width: ",width)
    }
  })

  const checkBadge = (index) => {
    setVisible(!visible)
    setSelectedBadge(Insignias[index])
  }

    return(
        <View style={[styles.container]} >
            <FlatList
                data={Insignias}
                scrollEnabled={false}
                numColumns={3}
                renderItem={({item, index}) => {
                    return(
                        <TouchableOpacity activeOpacity={0.9} 
                                          style={styles.thebadge}
                                          onPress={() => checkBadge(index)}
                        >
                            <Image source={{ uri: item.Imagem }} 
                                   resizeMode='contain' 
                                   style={{width: imageWidth, 
                                           height: imageHeight, 
                                           marginRight: (index + 1) % 3 == 0 ? 0 : margin,
                                         }}
                            />
                        </TouchableOpacity>
                    )
                    
                }}
            />
            <Modal visible={visible}
                onRequestClose={checkBadge} 
                animationType="slide"
                presentationStyle='pageSheet'
                >
                    <ModalBadge checkBadge={checkBadge} data={selectedBadge} />
            </Modal>

        </View>
    )




}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 24.25
    },
    thebadge:{
        alignItems: 'center',
    },

})