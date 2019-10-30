import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import CheckListScreen from './CheckListScreen';
import TimerScreen from './TimerScreen';
import Colors from '../config/Colors';

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

export default RootStack;