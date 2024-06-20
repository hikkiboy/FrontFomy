
import { StyleSheet, Text, View, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { FontAwesome, FontAwesome6 } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, where, orderBy, documentId, doc, updateDoc, arrayUnion } from '@firebase/firestore'
import { app_DB, app_auth } from '../../../firebaseConfig';


export default function Parabens({ navigation, route }) {

  const Receita = route?.params.paramKey[1]
  const [XP, setXP] = useState()
  const [LevelUp, setLevelUp] = useState()
  const [LevelUpLevel, setLevelUpLevel] = useState()
  const [ExpAtual, setExpAtual] = useState()
  const [ReceitasFeitas, setReceitasFeitas] = useState([])
  const [DocesQ, setDocesQ] = useState()
  const [MAtual, setMAtual] = useState()
  const [Moeda, setMoeda] = useState()
  const cor = route.params.cores[0]
  const corFill = route.params.cores[1]
  const corBorda = route.params.cores[2]
  //console.log("Current recipe key: ",route?.params.paramKey[1])
  //console.log("Current Trilha: ", route?.params.paramKey[2])

  useEffect(() => {
    handleUpdate()
    //Fiz com que ele só checasse XP da receita e ReceitasFeitas, sem verificar ExpAtual
    //Já que o ReceitasFeitas e ExpAtual mudam ao mesmo tempo...
    //Acho que isso arrumou o fato que ele rodava isso duas vezes antes, dando o dobro de xp na primeira vez que a pessoa fazia
  }, [XP, ReceitasFeitas])

  useEffect(() => {
    const UserRef = collection(app_DB, 'Usuarios')
    const q = query(
      UserRef,
      where(documentId(), '==', app_auth.currentUser.uid)
    )

    const subscriver = onSnapshot(q, {
      next: (snapshot) => {
        const userq = []

        snapshot.docs.forEach(doc => {
          userq.push({
            key: doc.id,
            ...doc.data(),

          })
        })
        setExpAtual(userq[0].Exp)
        setReceitasFeitas(userq[0].ReceitasFeitas)
        setDocesQ(userq)
        setMAtual(userq[0].Moedas)
        setLevelUp(userq[0].ExpLevel)
        setLevelUpLevel(userq[0].Nivel)
        //console.log("------------------ LOGS DE SET DO USER ATUAL ---------------------")
        //console.log()
        //console.log("Current XP: ", userq[0].Exp)
        //console.log("Current XP: ", ExpAtual)

        //console.log()
        //console.log("Recipes that the user did before: ", userq[0].ReceitasFeitas)
        //console.log()
        //console.log("Moedas do usuario antes do set:", userq[0].Moedas)
        //console.log("                                  ")
        //console.log("Moedas do usuario depois do set:", MAtual)
        //console.log()

        //console.log()
      }
    })

    return () => subscriver()

  }, [])


  useEffect(() => {
    const XPRef = collection(app_DB, 'Receitas')
    const q = query(
      XPRef,
      where(documentId(), '==', route?.params.paramKey[1])
    )

    const subscriver = onSnapshot(q, {
      next: (snapshot) => {
        const exp = []

        snapshot.docs.forEach(doc => {
          exp.push({
            key: doc.id,
            ...doc.data(),

          })
        })

        //console.log("------------------ LOGS DE SET DA RECEITA ---------------------")
        setMoeda(exp[0].Moedas)
        setXP(exp[0].Exp)
        //console.log(exp)
        //console.log()
        //console.log("Moedas pra receber: ", Moeda)
        //console.log()
        //console.log("Recipe xp: ", XP)
      }
    })

    return () => subscriver()

  }, [])

  function handleTrilha() {
    try {
      if (route?.params.paramKey[2] == "Refeições") {
        setDocesQ(DocesQ[0].Refeições)
        //console.log(DocesQ)
      } else if (route?.params.paramKey[2] == "Básico") {
        setDocesQ(DocesQ[0].Básico)
        //console.log(DocesQ)
      } else if (route?.params.paramKey[2] == "Doces") {
        setDocesQ(DocesQ[0].Doces)
        //console.log(DocesQ)
      } else if (route?.params.paramKey[2] == "Gourmet") {
        setDocesQ(DocesQ[0].Gourmet)
      }
      else {
        console.log(route?.params.paramKey[2])
        console.log("Deu errado :(")
      }
    } catch (error) {
      //console.log("")
    }

  }


  handleTrilha()

  const handleUpdate = async () => {
    //checa se tem algo para não atualizar o xp da pessoa com NaN ou undefined
    if (ExpAtual != undefined && XP != undefined && ExpAtual != NaN && XP != NaN && MAtual != undefined && Moeda != undefined && MAtual != NaN && Moeda != NaN) {
      try {
        //checa se dentro do "mapa" de ReceitasFeitas tem a Receita que acabou de fazer
        var checkIfDid = false
        ReceitasFeitas.forEach((field) => {
          if (field.match(Receita)) {
            checkIfDid = true
          }
        })


        //Sempre que ele faz pela primeira vez, ele faz isso duas vezes dando o dobro de xp
        //eu acho que o setState é tão FUCKING LENTO que precisa rodar DUAS VEZES para ele atualizar para tudo
        //UPDATE: (olha no primeiro useEffect)
        if (!checkIfDid) {

          //Coloquei em uma variavel prq tava dando erro colocando dentro do UpdateDoc
          //Ou só foi um pequeno bug e isso n arrumou nada mas whatever quem liga
          let addExp = (ExpAtual + XP)
          let addMoeda = (MAtual + Moeda)
          //console.log("poggers",MAtual, Moeda)
          try {
            //console.log("------atualizou xp do perfil------\n\n")
            const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
            //User levels up, untested
            if (addExp >= LevelUp) {
              addExp -= LevelUp
              let addLevel = (LevelUpLevel + 1)
              let newLevelUp = Math.round(LevelUp * 1.35)
              console.log("User leveled up to: ", addLevel)
              await updateDoc(userRef, {
                ReceitasFeitas: arrayUnion(Receita),
                Exp: addExp,
                Moedas: addMoeda,
                ExpLevel: newLevelUp,
                Nivel: addLevel
              });
            } else {
              await updateDoc(userRef, {
                ReceitasFeitas: arrayUnion(Receita),
                Exp: addExp,
                Moedas: addMoeda,
              });
            }
            if (route?.params.paramKey[2] == 'Refeições') {
              const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
              await updateDoc(userRef, {
                Refeições: DocesQ + 1
              });
            }
            else if (route?.params.paramKey[2] == 'Doces') {
              const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
              await updateDoc(userRef, {
                Doces: DocesQ + 1
              });
            }
            else if (route?.params.paramKey[2] == 'Básico') {
              const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
              await updateDoc(userRef, {
                Básico: DocesQ + 1
              });
            }
            else if (route?.params.paramKey[2] == 'Gourmet') {
              const userRef = doc(app_DB, "Usuarios", app_auth.currentUser.uid);
              await updateDoc(userRef, {
                Gourmet: DocesQ + 1
              });
            }

          } catch (error) {
            //console.log(error)
          }
        } else {
          //Ele tá mandando isso até na primeira vez, mas eu n ligo prq tá funcionando :)
          //console.log("esse maluquinho realmente acha que pode farmar xp LOL!!!")
        }
      } catch (error) {
        //console.log("esse try só checa por erro de lógica:")
        //console.log(error)
      }
    } else {
      //console.log("Tentou mas n foi prq é burro, que imbecil...")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFF" }}>

        <View style={styles.thisthing} >
          <View style={[styles.whydoyoudothis, {
            backgroundColor: cor,
            borderColor: corFill,
          }]} >
            <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', paddingBottom: 6, paddingStart: 10, zIndex: 99 }} onPress={() => navigation.goBack()} >
              <FontAwesome size={30} color={"#FFF"} name='arrow-left' />
            </TouchableOpacity>
            <Text style={styles.titulopassotexto}>Parabéns!</Text>
          </View>
        </View>
        <View style={styles.gainsarea} >
          <View style={styles.gainsstuff} >
            <View style={styles.statarea} >
              <FontAwesome6 style={{ marginRight: 8 }} color={"#FAB151"} name="piggy-bank" size={26} />
              <Text style={styles.textostats}>+{Moeda}</Text>
            </View>
            <View style={{ width: 40, height: 20 }} />
            <View style={styles.statarea} >
              <FontAwesome style={{ marginRight: 8 }} color={"#70D872"} name="plus" size={30} />
              <Text style={styles.textostats}>{XP} exp</Text>
            </View>
          </View>
        </View>
        <View style={styles.belowimage} >
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <View style={styles.teacharea} >
              <Image style={styles.confetti} source={require("../../assets/confetti2.gif")} />
              <Image style={styles.charimage} source={require("../../assets/betterAlberto.png")} />
            </View>
          </View>
          <View style={styles.descpassoarea}>
            <Image style={styles.triangle} tintColor={cor} source={require("../../assets/little_triangle_thing.png")} />
            <View style={{ width: '100%', zIndex: 2 }} >
              <View style={[styles.viewpasso, { borderColor: cor }]} >
                <Text style={styles.descpasso} >{route.params.paramKey[0]}</Text>
              </View>
              <View style={[styles.descpassoBehind, {
                borderColor: corFill,
              }]} />
            </View>
          </View>
          <TouchableOpacity style={{ width: "100%", paddingHorizontal: 10, alignSelf: 'center' }} onPress={() => navigation.navigate("Trilha", { paramKey: [route.params.navigate[0], route.params.navigate[1], route.params.navigate[2], route.params.navigate[3], route.params.navigate[4]] })}>
            <View style={styles.butao}>
              <Text style={styles.textobutao}>OBA!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#FFF"

  },
  goback: {
    padding: 7,
    paddingHorizontal: 9,
    position: 'absolute',
    zIndex: 99,
    top: 10,
    left: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  thisthing: {
    paddingHorizontal: 10,
    width: "100%",
    marginTop: 10,
  },
  whydoyoudothis: {
    backgroundColor: "#D383E3",
    paddingVertical: 8,
    borderColor: "#be48d5",
    borderWidth: 7,
    borderBottomWidth: 13,
    borderRadius: 20,
    justifyContent: 'center',
  },
  areatitulo: {
    marginTop: 50,
    paddingStart: 20,
    paddingEnd: 20,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20
    //position: 'absolute'
  },
  titulopasso: {
    zIndex: 99,
    backgroundColor: "#4A8E4B",
    borderRadius: 30,
    padding: 10,
    borderWidth: 5,
    borderBottomWidth: 10,
    borderTopWidth: 4,
    borderColor: "#356635",
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulopassotexto: {
    fontSize: 30,
    fontWeight: '600',
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center'

  },

  teacharea: {
    width: '100%',
    alignItems: 'center'

  },
  belowimage: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  descpassoarea: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 30
  },
  descpasso: {
    zIndex: 2,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: "#303030",
    //marginVertical: 100

  },
  viewpasso: {
    zIndex: 3,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 8,
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  descpassoBehind: {
    zIndex: 1,
    borderColor: '#4A8E4B',
    width: '100%',
    height: '100%',
    marginTop: 9,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 10,
  },
  triangle: {
    height: 27.6,
    width: 46.2,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -21,
    zIndex: 99
  },

  spaceinbetween: {
    backgroundColor: '#FFF',
    zIndex: 0,
    width: '100%',
    height: '50%',
    position: 'absolute'
  },
  confetti: {
    height: 300,
    width: "100%",
    position: 'absolute',
    resizeMode: 'contain'
  },
  charimage: {
    height: 300,
    width: 244,
    zIndex: 3
  },
  charsombra: {
    height: 42,
    width: 192.40,
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: 'red',
    right: 90,
    top: 50


  },
  parabenstitulo: {
    color: '#427643',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30,


  },
  parabenstexto: {
    fontSize: 20,
    textAlign: 'center',
    maxWidth: "100%"
  },
  gainsarea: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  gainsstuff: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statarea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconcontainer: {
    width: 35,
    alignItems: 'center',
    marginRight: 15
  },
  textostats: {
    fontWeight: 'bold',
    fontSize: 25,
    color: "#505050"
  },
  butao: {
    backgroundColor: '#FAB151',
    borderColor: '#ED8A07',
    borderWidth: 4,
    borderBottomWidth: 7,
    width: "100%",
    borderRadius: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 50
  },
  textobutao: {
    fontWeight: 'bold',
    fontSize: 25,
  }


});