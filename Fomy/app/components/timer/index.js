import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Timer } from "react-native-stopwatch-timer";
import { Audio } from "expo-av";
import { FontAwesome5 } from 'react-native-vector-icons'
export default class TimerPasso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      timerReset: false,
      began: false,
      finished: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setFinished = this.setFinished.bind(this);
  }

  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false, began: true });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true, began: false, finished: false });
  }

  setFinished() {
    //se estiver lagando o app quando acaba o timer, é por causa disso aqui que fica rodando várias vezes
    if (!this.state.finished) {
      this.setState({ finished: true })
    }
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.timerarea]}>
          {!this.state.began ? <FontAwesome5 style={styles.lefticon} color='#5DC15F' name='clock' size={80} /> : <TouchableOpacity onPress={this.resetTimer} ><FontAwesome5 style={styles.lefticon} color='#E15F64' name='redo' size={78.5} /></TouchableOpacity>}
          <View style={styles.rightarea} >
            <Timer
              style={[styles.timer]}
              totalDuration={this.props.totalDuration * 1000}
              start={this.state.timerStart}
              reset={this.state.timerReset}
              options={options}
              handleFinish={() => {this.setFinished(); handleTimerComplete();}}
              getTime={this.getFormattedTime}
            />
            {!this.state.finished &&
              <TouchableOpacity style={{ marginTop: 10 }} onPress={this.toggleTimer}>
                <FontAwesome5 name={!this.state.timerStart ? "play" : "pause"} size={25} color={!this.state.timerStart ? "#5DC15F" : "#E15F64"} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
}
let soundObject;
const playSound = async () => {
  console.log("Loading Sound");
  soundObject = new Audio.Sound();
  await soundObject.loadAsync(require("../../assets/audio/alarm.mp3"));

  console.log("Playing Sound");
  await soundObject.playAsync();

  setTimeout(() => {
    stopSound();
  }, 5000);
};

const stopSound = () => {
  if (soundObject) {
    console.log("Stopping Sound");
    soundObject.stopAsync();
  }
};

const handleTimerComplete = () => playSound();

const options = {
  container: {
    color: "#000",
    alignItems: 'center'
  },
  text: {
    fontSize: 35,
    color: "#000",
    fontWeight: "bold"
  },
};

AppRegistry.registerComponent("TimerPasso", () => TimerPasso);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  timerarea: {
    backgroundColor: "#FFF",
    paddingVertical: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  rightarea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  lefticon: {
    marginLeft: 30,
    marginVertical: 5
  }
});
