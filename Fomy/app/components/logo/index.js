import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration } from 'react-native';

export function Logo() {
  return (
    <TouchableOpacity onPress={() => Vibration.vibrate()}>
      <View style={styles.container}>
          <Image resizeMode='center' style={styles.Mascote} source={require('../../assets/alberto.png')}/>
          <Image resizeMode='center' style={styles.Titulo} source={require('../../assets/logoTitulo.png')}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Mascote:{
    top: 80,
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  Titulo:{
    top: 55 ,
    width: 200,
    height: 100,
    marginBottom: 100,
  },
});
