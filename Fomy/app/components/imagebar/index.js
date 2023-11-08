import React from "react"
import { View } from "react-native"
import Svg, { Rect } from "react-native-svg"

export default function ImageBar({ progress }) {

    const barWidth = 285;
    const progressWidth = ( progress / 100 ) * 285;

    return(
        <View style={{ alignSelf: 'center', alignItems: 'center', alignContent: 'center' }} >
            <Svg width={barWidth} height={35} >
                <Rect width={barWidth} height={"100%"} fill={"#D9D9D9"} rx={3.5} ry={3.5} />
                <Rect width={progressWidth} height={"100%"} fill={"#5EA5E8"} rx={3.5} ry={3.5} />
            </Svg>
        </View>
    )

}