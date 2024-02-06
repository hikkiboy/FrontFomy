import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Timer extends React.Component {

    state = {
        time: 5,
      };

      startTimer = () => {
        this.interval = setInterval(() => {
          this.setState(state => ({
            time: state.time != 0 ? state.time  -1: state.time,
          }));
        }, 1000);
      };
      
      stopTimer = () => {
        clearInterval(this.interval);
      };

      render() {
        return (
          <View>
            <Text>{this.state.time}</Text>
            <View>
                <TouchableOpacity onPress={this.startTimer}>
                <Text>Start</Text>
                </TouchableOpacity>
            </View>
            <View> 
                <TouchableOpacity onPress={this.stopTimer}>
                <Text>Stop</Text>
                </TouchableOpacity>
            </View>
          </View>
          

          
          
        );
      }
  }