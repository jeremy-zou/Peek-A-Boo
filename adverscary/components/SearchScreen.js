import React from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import styles from './Styles'

class SearchScreen extends React.Component {
    render() {
      return (
        <View style={styles.background}>
          <Text>SEARCH Screen</Text>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        
      );
    }
  }

  export default SearchScreen;