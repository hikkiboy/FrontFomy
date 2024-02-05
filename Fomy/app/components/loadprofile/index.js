import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from "react"
import { ActionModal } from "../actionmodal"
import { Badges } from "../badges"
import { useEffect } from "react"
import { app_auth, app_BKT, app_DB} from '../../../firebaseConfig'
import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore"
import * as Progress from "react-native-progress"
import { ImageUpload } from "../imageupload"
import * as ImagePicker from "expo-image-picker"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

export function LoadProfile({ data, navigation }){

    const [visible, setVisible] = useState(false)
    const [inputOn, setInputOn] = useState(false)
    const [newName, setNewName] = useState('')
    var totalXp = 200 + (((data.Nivel - 1) * data.Nivel) * 10)
    var progressToBar = (data.Exp / totalXp)

    //func to pick the damn image
    async function pickImage() {
        //properties of the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: .9
        })

        //checks if it wasn't cancelled
        if(!result.canceled){
            //uploads image
            await uploadImage(result.assets[0].uri, result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1, result.assets[0].uri.length));
        }
    }

    async function uploadImage( uri, fileName ){
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(app_BKT, "Pfps/" + data.Nome + new Date().getTime() + fileName )
        const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
        const uploadTask = uploadBytesResumable(storageRef, blob)

        //listen for events
        uploadTask.on("state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            //console.log("Progress: " + progress + "%")
        },
        (error) => {
            alert("Ocorreu um erro: "+error)
        },
        (complete) => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                //console.log("File available at: " + downloadUrl)
                try{
                    if(data.Foto != "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/Default-Profile-Picture-PNG-Photo-3895174684.png?alt=media&token=f70e36af-2857-405f-b307-5e7abe35f347"){
                        deleteObject(ref(app_BKT, data.Foto))
                    }
                    await updateDoc(userRef, {
                        Foto: downloadUrl
                    });
                    alert("Foto alterada com sucesso!")
                } catch (error){
                    //console.log(error)
                    alert("Ocorreu um erro: "+error)
                }
            })
        }
        )

    }

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
            unfilledColor="#EFEFEF"
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
            visibleSend = (<TouchableOpacity style={{ marginRight: 30 }} onPress={handleUpdate} ><Ionicons name="checkmark-circle" size={50} color="#7EB77F" /></TouchableOpacity>)
            visibleClose = (<TouchableOpacity onPress={closeThisBitchUp} ><Ionicons name="close-circle" size={50} color="#DC6A87" /></TouchableOpacity>);
    }

    return(
        <View style={styles.container} >
            <TouchableOpacity style={{ zIndex: 99 }} onPress={handleModal} >
                <Feather style={styles.menu} name="menu" size={35} color="#000"/>
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
                <View style={styles.badgearea} >
                    <View style={styles.badgetitlearea} >
                        <Text style={styles.badgetitle} >Insígnias</Text>
                    </View>
                    <View style={styles.badges} >
                        <Badges data={data} />
                    </View>
                
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
                    pickIt={pickImage}
                
                />
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        backgroundColor: "#FFF"
    },
    pfp:{
        width: 175,
        height: 175,
        borderRadius: 100,
    },
    pfpstuff:{
        alignItems: 'center'
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
        borderColor: "#FFF",
        backgroundColor: "#EFEFEF",
        marginTop: 35
    },
    name:{
        alignSelf: 'center',
        fontSize: 29,
        marginTop: 12,
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
    menu:{
        position: "absolute",
        alignSelf: 'flex-end',
        padding: 15,

    },
    inputarea:{
        position: 'absolute',
        marginTop: 23,
        alignItems: 'center',
        alignSelf: 'center'

    },
    buttonarea:{ 
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 70,
        position: 'absolute',
        alignSelf: 'center',

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
        marginTop: 45,
        marginBottom: 100
    },
    badgearea:{
        backgroundColor: "#EFEFEF",
        width: '100%',
        height: 350,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15

    },
    badgetitlearea:{
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: "#7EB77F",
        borderRadius: 22,
        padding: 5,
        paddingHorizontal: 20


    },
    badgetitle:{
        fontSize: 27,
        fontWeight: '500'

    },
    badges:{
        width: '100%',
        height: '20%',
        marginTop: 10
    }

})