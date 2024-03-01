import * as ImagePicker from "expo-image-picker"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { app_auth, app_BKT, app_DB} from '../../firebaseConfig'
import { doc , updateDoc} from 'firebase/firestore'

//func to pick the damn image
export async function pickImage( userImage ) {
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
        await uploadImage(result.assets[0].uri, result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1, result.assets[0].uri.length), userImage);
    }
}

async function uploadImage( uri, fileName, userImage ){
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(app_BKT, "Pfps/" + app_auth.currentUser.email + new Date().getTime() + fileName )
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
                if(userImage != "https://firebasestorage.googleapis.com/v0/b/fomy-5ea9c.appspot.com/o/albertobutcool%204.png?alt=media&token=175f4479-6c43-4ec3-b3e9-2d2a92471064"){
                    deleteObject(ref(app_BKT, userImage))
                }
                await updateDoc(userRef, {
                    Foto: downloadUrl
                });
            } catch (error){
                //console.log(error)
                alert("Ocorreu um erro: "+error)
            }
        })
    }
    )

}