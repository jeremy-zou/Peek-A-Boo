import React from 'react';
import { Button } from 'react-native-elements';
import { Image, Animated, View, Text } from 'react-native';
import styles from './Styles'
import ghostIcon from '../assets/icon.png'

class HomeScreen extends React.Component {
    
  render() {
    return (
      
      <View style={styles.home}>
        <FadeInView>
          <View style={{marginTop: 300}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={{width: 55, height: 55, marginTop: 0, marginRight: 8}}
                source={ghostIcon}
              />
              <Text style={styles.title}>peekaboo</Text>
            </View>
            <View style={{marginBottom: 300}}>
              <Button
                title="Search"
                type="outline"
                onPress={() => this.props.navigation.navigate('Search')}
              />
            </View>
          </View>
        </FadeInView>
      </View>
    );
  }
}

export default HomeScreen;

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

const ScrollUpView = (props) => {
  const [fadeAnim] = React.useState(new Animated.Value(1))

  React.useEffect(() => {
    Animated.timing(
      {
        toValue: 0,
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