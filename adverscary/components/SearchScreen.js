import React from 'react';
import { Button, SearchBar, colors } from 'react-native-elements';
import { View, Text } from 'react-native';
import styles from './Styles'
import Colors from '../assets/Colors';

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
            <View style={{marginTop: 15, alignItems:'center'}}>
                <SearchBar
                    containerStyle={{backgroundColor: 'black', width: 400}}
                    placeholderTextColor={Colors.appColor}
                    placeholder="Search movies"
                    onChangeText={this.updateSearch}
                    value={search}
                />
            </View>
        </View>
      );
    }
}

export default SearchScreen;
