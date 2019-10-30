import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Colors from '../config/Colors';
import styles from '../config/Styles';


export default class CheckListScreen extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        movie: props.navigation.state.params.selectedItem,
        jumpscares: false,
        gore: false,
        noSpoil: false,
      }
    }
    
    render() {
      return (
        <View style={styles.background}>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Text style={styles.normalText}>What you would like to be warned about?</Text>
          </View>
          <View style={{ padding:8, marginTop:25}}>
            <CheckBox
              title='Jump scares'
              checkedColor={Colors.appColor}
              checked={this.state.jumpscares}
              onPress={() => this.setState({jumpscares: !this.state.jumpscares})}
            />
  
            <CheckBox
              title='Gore'
              checkedColor={Colors.appColor}
              checked={this.state.gore}
              onPress={() => this.setState({gore: !this.state.gore})}
            />
            <CheckBox
              title='Spoiler-Free Notifications'
              checkedColor={Colors.appColor}
              checked={this.state.noSpoil}
              onPress={() => this.setState({noSpoil: !this.state.noSpoil})}
            />
  
          </View>
          <View style={{alignItems: 'center', marginTop: 210}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Timer', this.state)}
              activeOpacity={0.6}
              style={[styles.button, { backgroundColor:  '#FF6F00'}]} >
              <Text style={styles.buttonText}>Begin Movie</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}
