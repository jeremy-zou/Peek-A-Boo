import React from 'react';
import { Button, SearchBar, colors } from 'react-native-elements';
import { View, Text } from 'react-native';
import styles from './Styles'

class SearchScreen extends React.Component {
    state = {
      search: '',
    };
  
    updateSearch = search => {
      this.setState({ search });
    };
  
    render() {
      const { search } = this.state;
  
      return (
        <View style={styles.background}>
            <View style={{marginTop: 50, alignItems:'center'}}>
                <SearchBar
                    containerStyle={{backgroundColor: 'black', width: 400}}
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <Text style={{color: 'white', fontSize: 22}}>What would you like to avoid?</Text>
            </View>
            <View style={{marginBottom: 50, width: 150}}>
                <Button
                title="Go back"
                type='outline'
                onPress={() => this.props.navigation.goBack()}
                />
            </View>
        </View>
      );
    }
}

export default SearchScreen;
