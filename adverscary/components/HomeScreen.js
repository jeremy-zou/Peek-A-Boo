import React from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import styles from './Styles'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class HomeScreen extends React.Component {
    render() {
      return (
        
        <View style={styles.background}>
          <Text style={styles.title}>adverscary</Text>
          <Button
            title="Search"
            type="outline"
            onPress={() => this.props.navigation.navigate('Search')}
          />
        </View>
      );
    }
  }

  export default HomeScreen;