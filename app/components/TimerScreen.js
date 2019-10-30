import * as React from 'react';
import { View, Text, TouchableOpacity, Platform} from 'react-native';
import { Notifications } from 'expo';
import styles from '../config/Styles';
import firebase from 'firebase';
import { toSeconds } from '../utils/Helper';

export default class TimerScreen extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        movie: props.navigation.state.params.movie,
        gore: props.navigation.state.params.gore,
        noSpoil: props.navigation.state.params.noSpoil,
        jumpscares: props.navigation.state.params.jumpscares,
        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
        hours_Counter: '00',
        startDisable: false,
        timerStartTime: null,
        // buffer will be in milliseconds
        buffer: 0,
      }
  
      var timeStamps = new Array();
      var descriptions = new Array();
  
      firebase.database().ref('movies/'.concat(this.state.movie["name"], '/scares')).once('value', function (snapshot) {
        let val = snapshot.val();
        for (var i = 0; i < val.length; i++) {
          for (key in val[i]) {
            timeStamps.push(key);
            descriptions.push(val[i][key]);
          }
        }
      })
  
      this.timeStamps = timeStamps;
      this.descriptions = descriptions;
    }
   
    componentWillUnmount() {
      clearInterval(this.state.timer);
    }
   
    onButtonStart = () => {
      this.state.timerStartTime = Date.now();
      let timer = setInterval(() => {
        var sec = (Math.floor(((Date.now() - this.state.timerStartTime + this.state.buffer)/1000)) % 60).toString(),
          min = Math.floor(((Math.floor((Date.now() - this.state.timerStartTime + this.state.buffer)/1000)) % 3600)/60).toString(),
          hr = Math.floor((Math.floor((Date.now() - this.state.timerStartTime + this.state.buffer)/1000)) /3600).toString();
  
        this.setState({
          minutes_Counter: min.length == 1 ? '0' + min : min,
          seconds_Counter: sec.length == 1 ? '0' + sec : sec,
          hours_Counter: hr.length == 1 ? '0' + hr:hr
        });
      }, 1000);
      this.setState({ timer });
      Notifications.addListener(() => {
        console.log('triggered!');
        console.log(Date.now());
      });
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('peekaboo', {
          name: 'peekaboo',
          sound: false,
          priority: 'max',
          vibrate: true
        });
      }
      var currentTime = Date.now();
      for (var i = 0; i < this.timeStamps.length; i++) {
        var timeStamp = currentTime
            + (1000 * toSeconds(this.timeStamps[i])) - 15000 - this.state.buffer;
        if (timeStamp < currentTime) {
          // this alert has already happened
          continue;
        }
        console.log(this.timeStamps[i]);
        console.log(this.descriptions[i]);
        console.log(new Date(currentTime
            + (1000 * toSeconds(this.timeStamps[i])) - 15000 - this.state.buffer));
        var notifText = "Take Cover! (No Spoilers)"
        if (this.state.noSpoil == false) {
          notifText = this.descriptions[i]
        }
        Notifications.scheduleLocalNotificationAsync(
          {
            title: "Jump Scare Alert!",
            body: notifText,
            android: {
              channelId: 'peekaboo',
            },
            ios: {
              sound: true,
              _displayInForeground: true
            }
          },
          {
            time: new Date(timeStamp)
          }
        );
      }
      this.setState({startDisable : true})
    }
   
    onButtonStop = () => {
      // clearInterval stops the timer
      clearInterval(this.state.timer);

      if (Platform.OS == 'android') {
        Notifications.dismissAllNotificationsAsync();
        Notifications.deleteChannelAndroidAsync('peekaboo');
      }

      Notifications.cancelAllScheduledNotificationsAsync();
      this.setState({
        startDisable : false,
        buffer: Date.now() - this.state.timerStartTime + this.state.buffer,
      })
    }
   
    onButtonClear = () => {
      if (Platform.OS === 'android') {
        Notifications.dismissAllNotificationsAsync();
        Notifications.deleteChannelAndroidAsync('peekaboo');
      }
      
      Notifications.cancelAllScheduledNotificationsAsync();
      this.setState({
        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
        hours_Counter: '00',
        timerStartTime: null,
        buffer: 0,
      });
    }
   
    render() {
      return (
        <View style={styles.MainContainer}>
  
          <Text style={styles.counterText}>{this.state.hours_Counter} : {this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
  
          <TouchableOpacity
            onPress={this.onButtonStart}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
            disabled={this.state.startDisable} >
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={this.onButtonStop}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor:  '#FF6F00'}]} >
            <Text style={styles.buttonText}>PAUSE</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={this.onButtonClear}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
            disabled={this.state.startDisable} >
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
        </View>
  
      );
    }
}