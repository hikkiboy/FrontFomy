import { View, StyleSheet, FlatList, BackHandler, Alert, Platform } from 'react-native'
import { app_DB } from '../../../firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState, useRef } from 'react'
import Animated, { useAnimatedScrollHandler, useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import OnboardingItem from '../../components/Onboarding'
import paginator from '../../components/paginator'
import { useIsFocused } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'

const Home = ({ navigation }) => {



    const [Receitas, setReceitas] = useState([]);
    const isFocused = useIsFocused();
    if (Platform.OS === 'android') {
        NavigationBar.setBackgroundColorAsync('#FFF');
    }


    useEffect(() => {
        if (isFocused) {
            //console.log("focado")
            const backAction = () => {
                BackHandler.exitApp()
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();
        }

    }, [isFocused])

    useEffect(() => {
        const receitaRef = collection(app_DB, 'Trilhas')

        const subscriver = onSnapshot(receitaRef, {
            next: (snapshot) => {
                const receitas = []
                snapshot.docs.forEach(doc => {

                    receitas.push({
                        key: doc.id,
                        ...doc.data()
                    })
                })
                setReceitas(receitas)


            }
        })

        return () => subscriver()

    }, [])


    const flatListRef = useAnimatedRef();
    const x = useSharedValue(0)



    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    })

    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' ? (
                <>
                    <StatusBar style='auto' />
                </>
            ) : (
                <>
                </>
            )}
            <Animated.FlatList
                ref={flatListRef}
                onScroll={onScroll}
                data={Receitas}
                renderItem={({ item, index }) => {
                    return <OnboardingItem size={Receitas.length} item={item} index={index} x={x} navigation={navigation} />
                }}
                keyExtractor={item => item.key}
                scrollEventThrottle={16}
                horizontal={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    botao: {
        backgroundColor: "#7EB77F",
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        padding: 13,
        paddingLeft: 40,
        paddingRight: 40,
        borderColor: "black",
        borderWidth: 3,
        marginTop: 20,
        marginBottom: 200,
        borderRadius: 10,
        width: 250,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }

})

export default Home