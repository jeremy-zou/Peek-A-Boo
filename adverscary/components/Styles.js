import {StyleSheet} from 'react-native';
import Colors from '../assets/Colors';

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
      //alignItems: 'center'
    },
    normalText: {
      color: Colors.appColor,
      fontFamily: 'openSans',
      //fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center'
    },
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    button: {
      width: '80%',
      paddingTop:8,
      paddingBottom:8,
      borderRadius:7,
      marginTop: 10
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        fontSize: 20
    },
    counterText:{
      fontSize: 28,
      color: 'white'
    }
  })

  export default styles;