import React, { Component, useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { Audio } from "expo-av";
import { FontAwesome5 } from 'react-native-vector-icons'

export default class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      timerReset: false,
      stopwatchReset: false,
      began: false
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false, began: true });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true, began: false });
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
    stopSound()
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.timerarea]}>
          {!this.state.began ? <FontAwesome5 style={styles.lefticon} color='#5DC15F' name='clock' size={70}/> : <TouchableOpacity onPress={this.resetTimer} ><FontAwesome5 style={styles.lefticon} color='#E15F64' name='redo'  size={70} /></TouchableOpacity>}
          <View style={styles.rightarea} >
            <Timer
              style={[styles.timer]}
              totalDuration={this.props.totalDuration * 1000}
              start={this.state.timerStart}
              reset={this.state.timerReset}
              options={options}
              handleFinish={handleTimerComplete}
              getTime={this.getFormattedTime}
            />
            <TouchableOpacity onPress={this.toggleTimer}>
              <FontAwesome5 name={!this.state.timerStart ? "play" : "pause"} size={20} />
            </TouchableOpacity>
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
  await soundObject.loadAsync(require("./baronsOfPisadinha.mp3"));

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
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 5,
    width: 150,
    color: "#000",
  },
  text: {
    fontSize: 30,
    color: "#000",
    marginLeft: 7,
    fontWeight: "bold"
  },
};

AppRegistry.registerComponent("TestApp", () => TestApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  timerarea: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
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
  lefticon:{
    marginHorizontal: 10,
    marginLeft: 25
  }
});
