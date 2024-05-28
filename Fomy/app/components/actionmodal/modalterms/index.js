import React from 'react';
import { SafeAreaView, ScrollView, Text, Button, StyleSheet, View, TouchableOpacity } from 'react-native';

export function ModalTerm({ handleCloseModal }) {
    return (
        <View style={styles.modal}>
         
                <Text style={styles.modalText}>vai tomanocu</Text>
                <TouchableOpacity style={styles.buttonRegistro} title="Fechate" onPress={handleCloseModal}>
                    <Text style={[styles.botaoTexto]}>Fechate</Text>
                </TouchableOpacity>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#62bc63',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        color: '#62bc63'
    },
    buttonRegistro: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        padding: 13,
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 4,
        borderBottomWidth: 8,
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 15,
        width: 250,
    },
    botaoTexto: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        color: "#000"
    },
});
