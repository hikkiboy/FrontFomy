import { Image, Text, StyleSheet, View, Button, TouchableOpacity, Modal } from 'react-native';
import ImageBar from '../imagebar';

export function ImageUpload({ data, image, progress }) {

    return(
        <View style={{ flex: 1 }} >
            <Modal transparent={true} style={{ flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} >
                <View style={{ height: '30%', paddingStart: 20, paddingEnd: 20, width: '100%' }} >
                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                                borderRadius: 6
                            }}
                        
                        />
                    )
                    
                    }
                    <Text allowFontScaling={false} style={styles.text} >Uploading...</Text>
                    <ImageBar progress={progress} />
                    <TouchableOpacity activeOpacity={0.9} style={styles.button} >
                        <Text allowFontScaling={false} style={styles.buttontext} >Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    text:{
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    button:{
        backgroundColor: "#F68F92", 
        borderRadius: 15, 
        paddingVertical: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 25,
        marginHorizontal: 50

    },
    buttontext:{
        textAlign: 'center',
        fontSize: 18, 
        fontWeight: 'bold'

    }

})