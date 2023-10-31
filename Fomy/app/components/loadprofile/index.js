import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"
import { ActionModal } from "../actionmodal"
import { useEffect } from "react"
import { app_auth, app_DB} from '../../../firebaseConfig'
import { doc, updateDoc } from "firebase/firestore"
import * as Progress from 'react-native-progress'

export function LoadProfile({ data, navigation }){

    const [visible, setVisible] = useState(false)
    const [inputOn, setInputOn] = useState(false)
    const [newName, setNewName] = useState('')
    var totalXp = 200 + (((data.Nivel - 1) * data.Nivel) * 10)
    var progressToBar = (data.Exp / totalXp)

    const handleModal = () => {
        setVisible(!visible);
    }

    const handleInput = () => {
        setVisible(false)
        setInputOn(true);
    }

    const closeThisBitchUp = () => {
        setNewName('')
        setInputOn(false);
    }

    const handleUpdate = async () => {
        if(newName != ''){
            try{
                const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
                await updateDoc(userRef, {
                    Nome: newName
                });
                setInputOn(false);
                setNewName('')
            } catch(error){
                console.log(error)
                alert("Ocorreu um erro "+error)
            }
        } else{
            setInputOn(false);
        }
    };
    var visibleInput = null
    var visibleClose = null
    var visibleSend = null
    var nome = data.Nome
    var titulo = data.Titulo
    var progressMyBar = (
        <Progress.Bar style={{ position: 'absolute' }} 
            progress={progressToBar} 
            width={325} 
            height={35} 
            borderRadius={9}
            color="#F68F92"
            borderWidth={0}
            unfilledColor="#D9D9D9"
        />
    )
    var progressExp = (
        <Text style={styles.exp} >EXP: {data.Exp} / {totalXp}</Text>
    )

    if(inputOn){
            nome = null
            titulo = null
            progressMyBar = null
            progressExp = null
            visibleInput = (<TextInput enterKeyHint={"done"} value={newName} onChangeText={(text) => setNewName(text)} autoFocus={true} maxLength={35} placeholder="Digite o nome" style={styles.nameinput} />)
            visibleSend = (<TouchableOpacity onPress={handleUpdate} ><Ionicons name="checkmark-circle" size={50} color="#7EB77F" /></TouchableOpacity>)
            visibleClose = (<TouchableOpacity onPress={closeThisBitchUp} ><Ionicons name="close-circle" size={50} color="#DC6A87" /></TouchableOpacity>);
    }

    return(
        <View style={styles.container} >
            <TouchableOpacity style={{ zIndex: 99 }} onPress={handleModal} >
                <Ionicons style={styles.gear} name="settings-sharp" size={35} color="#000"/>
            </TouchableOpacity>
            <View style={styles.pfpstuff} >
                <View style={styles.bgpfp} ></View>
                <View style={styles.brdrpfp} >
                    <Image
                        source={{ uri: data.Foto }}
                        style={styles.pfp}
                
                    />
                </View>
                <View>
                    <Image
                        source={require('../../assets/bandeira-nivel.png')}
                        style={styles.flag}
                    />
                    <Text style={styles.lvl} >Lv. {data.Nivel}</Text>
                    <View>
                        <Text style={styles.name} >{nome}</Text>
                        <Text style={styles.title} >{titulo}</Text>
                        <View style={styles.inputarea} >
                            {visibleInput}
                        </View>
                        <View style={styles.buttonarea} >
                            {visibleSend}
                            {visibleClose}
                        </View>
                    </View>
                </View>
                <View style={styles.progressbar} >
                    {progressMyBar}
                    {progressExp}
                    
                </View>
            </View>

            <Modal visible={visible}
            onRequestClose={handleModal} 
            animationType="slide"
            transparent={true}
            >
                <ActionModal
                    handleAction={handleModal}
                    navigation={navigation}
                    handleName={handleInput}
                
                />
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    pfp:{
        width: 175,
        height: 175,
        borderRadius: 100,
    },
    pfpstuff:{
        alignItems: 'center',
        paddingBottom: 40
    },
    bgpfp:{
        backgroundColor: "#7EB77F", 
        width: '100%', 
        height: 130, 
        position: "absolute"
    },
    brdrpfp:{
        width: 195,
        height: 195,
        borderRadius: 150,
        borderWidth: 10,
        marginBottom:-100,
        borderColor: "#EFEFEF",
        backgroundColor: 'white',
        marginTop: 35
    },
    name:{
        alignSelf: 'center',
        fontSize: 29,
        marginTop:10,
        fontWeight: 'bold'
    },
    nameinput:{
        backgroundColor: "#7EB77F",
        paddingHorizontal: 12,
        borderRadius: 15,
        textAlign: 'center',
        width: 320,
        fontSize: 29

    },
    title:{
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: "rgba(0,0,0,0.5)"
    },
    flag:{
        alignSelf: 'center',
        width: 208,
        height: 48,
        marginTop: 60
    },
    lvl:{
        alignSelf: 'center',
        fontSize: 27,
        position:"absolute",
        marginTop: 60,
        fontWeight: '700'

    },
    gear:{
        position: "absolute",
        alignSelf: 'flex-end',
        padding: 10

    },
    inputarea:{
        position: 'absolute',
        marginTop: 15,
        alignItems: 'center',
        alignSelf: 'center'

    },
    buttonarea:{ 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: -10

    },
    exp:{
        position: 'absolute',
        alignSelf: 'center',
        color: "rgba(0,0,0,0.25)",
        fontWeight: 'bold',
        fontSize: 27
    },
    progressbar:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 43
    }

})