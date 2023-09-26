import React, { Component, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import {firebase} from '../../../firebaseConfig'
import { QuerySnapshot } from '@firebase/firestore';


const Fetch = () =>{

    const [user, setUser] = useState([])
    const todoRef = firebase.firestore().collection('Trilhas')


    const teste = async () => {
        todoRef.onSnapshot(
            QuerySnapshot => {
                const user = []
                QuerySnapshot.forEach((doc) => {
                    const {heading, text} = doc.data()
                    user.push({
                        id: doc.id,
                        array,
                        string,
                        number

                    })
                })
                setUser(user)
            }
        )
    }

    useEffect(() =>{
        teste();
    }
, [])
    


    return(
        <View>
            <FlatList
            data = {user}
            numColumns={1}
            renderItem={({item}) => (
                <Pressable>
                    <View>

                        <Text></Text>
                    </View>
                </Pressable>
            )}
            />

        </View>
    )
}

export default Fetch