import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Circle,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export function BotaoTrilha() { 
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={133}
    height={135}
    fill="none"
  >
    <G filter="url(#a)">
      <Circle
        cx={65.929}
        cy={65.929}
        r={65.007}
        fill="#7EB77F"
        transform="rotate(-.819 65.93 65.93)"
      />
    </G>
    <Path fill="url(#b)" fillOpacity={0.5} d="M30 24h83v83H30z" />
    <Defs>
      <Pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="scale(.00195)" />
      </Pattern>
    </Defs>
  </Svg>
}

export default BotaoTrilha
