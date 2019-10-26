import React from 'react';
import { Button } from 'react-native-elements';
import { Animated, View, Text } from 'react-native';
import styles from './Styles'

class HomeScreen extends React.Component {
    
  render() {
    return (
      
      <View style={styles.home}>
        <FadeInView>
          <View style={{marginTop: 150}}>
            <Text style={styles.title}>peek a boo</Text>
            <View style={{marginTop: 50}}>
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