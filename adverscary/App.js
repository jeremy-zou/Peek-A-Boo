import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import styles from './components/Styles'

import { CSSTransition, TransitionGroup } from 'react-transition-group';


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}