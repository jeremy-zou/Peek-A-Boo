import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from '../config/Styles';
import movies from '../api/movies';

export default class SearchScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        selectedItem: "",
      };
    }
    render() {
      return (
        <View style={styles.background}>
          <View style={{marginTop: 15}}>
            <SearchableDropdown
              onTextChange={text => console.log(text)}
              //On text change listner on the searchable input
              onItemSelect={item => {
                this.setState({selectedItem: item || ""})
              }}
              
              //onItemSelect called after the selection from the dropdown
              containerStyle={{ padding: 5 }}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 17,
                borderWidth: 1,
                borderColor: '#979797',
                backgroundColor: '#37373a',
                color: 'white',
                fontSize: 20
              }}
              itemStyle={{
                //single dropdown item style
                padding: 17,
                backgroundColor: 'black',
                //borderColor: Colors.secondaryColor,
                borderWidth: .5,
              }}
              itemTextStyle={{
                //single dropdown item's text style
                color: 'white',
                fontSize: 20
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '73%',
              }}
              items={movies}
              //mapping of item array
              placeholder="Search movies..."
              //place holder for the search input
              placeholderTextColor={'white'}
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
          </View>
          <View style={{marginTop:422, alignItems: 'center'}}>
            <TouchableOpacity
              disabled={(this.state.selectedItem == "")}
              onPress={() => this.props.navigation.navigate('CheckList', this.state)}
              activeOpacity={0.6}
              style={[styles.button, { backgroundColor: this.state.selectedItem=="" ? '#B0BEC5' : '#FF6F00' }]} >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      );
    }
}