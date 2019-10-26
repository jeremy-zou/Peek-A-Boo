import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import styles from './components/Styles'
import * as Font from 'expo-font';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AppLoading } from 'expo';


const AppNavigator = createStackNavigator(
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
        headerStyle: {
          backgroundColor: "black",
          borderBottomWidth: 0
        }
      }
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen'
  }
);

const AppContainer = createAppContainer(AppNavigator);

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
      this.setState({fontLoaded: true});
    } catch (error) {
      console.log("error loading fonts", error);
    }
  }
  
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return <AppContainer />;
  }
}