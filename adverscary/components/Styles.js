import {StyleSheet} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    home: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 50,
      fontFamily: 'bungee',
    },
    background: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    normalText: {
      color: "#ff7325",
      fontFamily: 'openSans',
      //fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center'
    }
  })

  export default styles;