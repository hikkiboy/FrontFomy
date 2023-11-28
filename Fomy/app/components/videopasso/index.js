import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe'
import * as Screen from 'expo-screen-orientation'
import { PLAYER_STATES } from 'react-native-youtube-iframe';


export default function VideoPassos({idVideo}) {

    const [videoReady, setVideoReady] = useState(false)
    const [playing, setplaying] = useState(true)
    const id = idVideo
    const onFullScreenChange = useCallback((isfullscreen) => {
        if (isfullscreen){
            Screen.lockAsync(Screen.OrientationLock.LANDSCAPE)
        }else{
            Screen.lockAsync(Screen.OrientationLock.PORTRAIT)
        }
    }, [])
    
    const onChangeState = useCallback((state) => {
        if(state == PLAYER_STATES.ENDED){
            setplaying(false)
        }
    }, [])

  return (
    <View style={styles.container}>
        <YoutubeIframe
        videoId = {id}
        height={400}
        width={400}
        play
        onReady={() => setVideoReady(true)}
        initialPlayerParams={{loop: true}}
        onFullScreenChange={onFullScreenChange}
        onChangeState={onChangeState}
        playList={id}
        volume={0}
        
        />
     </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignSelf: 'center',
        marginTop: 17,
        borderRadius: 10
    },
    video:{
        flex: 1,
        alignSelf: 'stretch'
    }
})
