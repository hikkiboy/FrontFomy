import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration } from 'react-native';

export function Logo() {
  console.log('Se leu, seu cu é meu');
  return (
    
      <View style={styles.container}>
          <Image resizeMode='center' style={styles.Mascote} source={require('../../assets/alberto.png')}/>
          <Image resizeMode='center' style={styles.Titulo} source={require('../../assets/logoTitulo.png')}/>
      </View>

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
