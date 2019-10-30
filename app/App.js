import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import _ from 'lodash';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import RootStack from './components/RootStack';


const config = {
  databaseURL: 'https://adverscary.firebaseio.com/',
  projectId: 'adverscary'
};
firebase.initializeApp(config);

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