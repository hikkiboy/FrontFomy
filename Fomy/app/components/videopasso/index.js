import React, { useCallback, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe'
import * as Screen from 'expo-screen-orientation'
import { PLAYER_STATES } from 'react-native-youtube-iframe';


export default function VideoPassos({idVideo}) {

    const [videoReady, setVideoReady] = useState(false)
    const [playing, setplaying] = useState(true)
    const id = idVideo
    console.log(id)

    const playerRef = useRef()

    const onFullScreenChange = useCallback((isfullscreen) => {
        if (isfullscreen){
            Screen.lockAsync(Screen.OrientationLock.LANDSCAPE)
        }else{
            Screen.lockAsync(Screen.OrientationLock.PORTRAIT)
        }
    }, [])
    
    const onChangeState = useCallback((state) => {
        if(state == PLAYER_STATES.ENDED){
            playerRef.current?.seekTo("0")
        }
    }, [])

  return (
    <View style={styles.container}>
        <YoutubeIframe
        videoId = {id}
        height={400}
        width={400}
        play = {true}
        
        onReady={() => setVideoReady(true)}
        initialPlayerParams={{loop: true}}
        onFullScreenChange={onFullScreenChange}
        onChangeState={onChangeState}
        playList={[id]} 
        volume={0}
        
        />
     </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignSelf: 'center',
        marginTop: -90
    },
    video:{
        flex: 1,
    }
})
