import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { app_auth, app_DB } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'
import { useEffect, useState} from 'react'
import { LoadProfile } from '../../components/loadprofile'
import { useIsFocused } from '@react-navigation/native'


import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = ({navigation}) => {

    const [Receitas, setReceitas] = useState([]);
    const [user, setUser] = useState();
    const isFocused = useIsFocused();

    useEffect(()=>{
            //this try is only here so that a problem with app_auth.currentUser.uid being undefined doesn't happen
            try{
                    //the setUser works as a way to make the dependecy (app_auth.currentUser.uid) actually make useEffect happen
                    //don't know exactly why it works like that, but it works
                    //there's still the problem that it flashes the old user for a sec when working through asyncstorage
                    //but I think this is better than updating the profile each time the user accesses it
                    setUser(app_auth.currentUser.uid)
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
                            //console.log("Queried the profile, reason: update.")


                
                        }
                    })
                
                    return() => subscriver()
            } catch(error){
                //console.log("User uid error, probably logged off")
            }
    },[app_auth.currentUser])
    

    return (
        
        <SafeAreaView style={styles.container} >
            
            <View>
                <FlatList
                data={Receitas}
                renderItem={({item}) => (
                    <LoadProfile data={item} navigation={navigation} />
                )}
                />
            </View>     

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: "#7EB77F"
    }
})

export default Profile