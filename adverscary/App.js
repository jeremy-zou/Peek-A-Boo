import * as React from 'react';
import { Component, Fragment } from 'react';
import { Image, Animated, View, Text, TouchableOpacity, Platform} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { CheckBox } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import movies from './api/movies';
import _ from 'lodash';
import * as Font from 'expo-font';
import { AppLoading, Notifications } from 'expo';
import ghostIcon from './assets/icon.png';
import Colors from './assets/Colors';
import styles from './components/Styles';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';

class HomeScreen extends React.Component {

  render() {
    return (
      
      <View style={styles.home}>
        <FadeInView>
          <View style={{marginTop: 300, marginBottom:-20}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={{width: 55, height: 55, marginTop: 0, marginRight: 8}}
                source={ghostIcon}
              />
              <Text style={styles.title}>peek-a-boo</Text>
            </View>
            <Text style={styles.normalText}>Be Prepared, Not Scared</Text>
            <View style={{marginTop:215, marginBottom: 270, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Search')}
                activeOpacity={0.6}
                style={[styles.button, { backgroundColor:  '#FF6F00'}]} >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>
      </View>
    );
  }
}

const FadeInView = (props) => {
  const [fadeAnim] = React.useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1500,
      }
    ).start();
  }, [])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

var items = movies; // todo: get array of all movie names here
const config = {
  databaseURL: 'https://adverscary.firebaseio.com/',
  projectId: 'adverscary'
};
firebase.initializeApp(config);

class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: "",
    };
  }
  render() {
    return (
      <View style={styles.background}>
        <View style={{marginTop: 15}}>
          <SearchableDropdown
            onTextChange={text => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={item => {
              this.setState({selectedItem: item || ""})
            }}
            
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5 }}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 17,
              borderWidth: 1,
              borderColor: '#979797',
              backgroundColor: '#37373a',
              color: 'white',
              fontSize: 20
            }}
            itemStyle={{
              //single dropdown item style
              padding: 17,
              backgroundColor: 'black',
              //borderColor: Colors.secondaryColor,
              borderWidth: .5,
            }}
            itemTextStyle={{
              //single dropdown item's text style
              color: 'white',
              fontSize: 20
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: '73%',
            }}
            items={items}
            //mapping of item array
            placeholder="Search movies..."
            //place holder for the search input
            placeholderTextColor={'white'}
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
        </View>
        <View style={{marginTop:422, alignItems: 'center'}}>
          <TouchableOpacity
            disabled={(this.state.selectedItem == "")}
            onPress={() => this.props.navigation.navigate('CheckList', this.state)}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor: this.state.selectedItem=="" ? '#B0BEC5' : '#FF6F00' }]} >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

class CheckListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: props.navigation.state.params.selectedItem,
      jumpscares: false,
      gore: false,
    }
  }
  
  render() {
    return (
      <View style={styles.background}>
        <View style={{alignItems: 'center', marginTop: 60}}>
          <Text style={styles.normalText}>What you would like to be warned about?</Text>
        </View>
        <View style={{ padding:8, marginTop:25}}>
          <CheckBox
            title='Jump scares'
            checkedColor={Colors.appColor}
            checked={this.state.jumpscares}
            onPress={() => this.setState({jumpscares: !this.state.jumpscares})}
          />

          <CheckBox
            title='Gore'
            checkedColor={Colors.appColor}
            checked={this.state.gore}
            onPress={() => this.setState({gore: !this.state.gore})}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 265}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Timer', this.state)}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor:  '#FF6F00'}]} >
            <Text style={styles.buttonText}>Begin Movie</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function toSeconds(datetime) {
  const times = datetime.split(":");
  var seconds;
  if (times.length == 1) {
    seconds = Number(times[0]);
  } else if (times.length == 2) {
    seconds = Number(times[0]) * 60 + Number(times[1]);
  } else if (times.length == 3) {
    seconds = Number(times[0]) * 3600 + Number(times[1]) * 60 + Number(times[2]);
  }

  return seconds;
}

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      movie: props.navigation.state.params.movie,
      gore: props.navigation.state.params.gore,
      jumpscares: props.navigation.state.params.jumpscares,
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      hours_Counter: '00',
      startDisable: false,
      timerStartTime: null,
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
      var sec = (Math.floor(((Date.now() - this.state.timerStartTime)/1000) + this.state.buffer) % 60).toString(),
        min = Math.floor(((Math.floor((Date.now() - this.state.timerStartTime)/1000) + this.state.buffer) % 3600)/60).toString(),
        hr = Math.floor((Math.floor((Date.now() - this.state.timerStartTime)/1000) + this.state.buffer) /3600).toString();

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
      console.log(this.timeStamps[i]);
      console.log(this.descriptions[i]);
      console.log(new Date(currentTime + (1000 * toSeconds(this.timeStamps[i])) - 15000));
      Notifications.scheduleLocalNotificationAsync(
        {
          title: "Jump Scare Alert!",
          body: this.descriptions[i],
          android: {
            channelId: 'peekaboo',
          },
          ios: {
            sound: true,
            _displayInForeground: true
          }
        },
        {
          time: new Date(currentTime + (1000 * toSeconds(this.timeStamps[i])) - 15000)
        }
      );
    }
    this.setState({startDisable : true})
  }
 
  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({
      startDisable : false,
      buffer : (Math.floor(Date.now() - this.state.timerStartTime) / 1000) + this.state.buffer,
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

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerBackTitle: 'Back',
        title:'PEEK-A-BOO',
        //headerTitle: 'PEEK-A-BOO',
        headerTitleStyle: {
          fontFamily: 'bungee'
        },
        headerStyle: {
          backgroundColor: "black",
          borderBottomWidth: 0
        },
        headerTintColor: Colors.secondaryColor
      }
    },
    CheckList: {
      screen: CheckListScreen,
      navigationOptions: {
        headerBackTitle: 'Back',
        title:'PEEK-A-BOO',
        //headerTitle: 'PEEK-A-BOO',
        headerTitleStyle: {
          fontFamily: 'bungee'
        },
        headerStyle: {
          backgroundColor: "black",
          borderBottomWidth: 0
        },
        headerTintColor: Colors.secondaryColor
      }
    },
    Timer: {
      screen: TimerScreen,
      navigationOptions: {
        headerBackTitle: 'Back',
        title:'PEEK-A-BOO',
        //headerTitle: 'PEEK-A-BOO',
        headerTitleStyle: {
          fontFamily: 'bungee'
        },
        headerStyle: {
          backgroundColor: "black",
          borderBottomWidth: 0
        },
        headerTintColor: Colors.secondaryColor
      }
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        'bungee': require('./assets/fonts/bungee.otf'),
        'openSans': require('./assets/fonts/openSans.ttf')
      });
      Permissions.askAsync(Permissions.NOTIFICATIONS);
      this.setState({fontLoaded: true});
    } catch (error) {
      console.log("error loading fonts", error);
    }
  }
  render() {
    if(!this.state.fontLoaded) {
      return <AppLoading />
    }
    GLOBAL.movie = this;
    GLOBAL.avoidMovieTypes = this;
    return <AppContainer />;
  }
}