import * as React from 'react';
import { Image, View, Text, TouchableOpacity} from 'react-native';
import ghostIcon from '../assets/icon.png';
import styles from '../config/Styles';
import { FadeInView } from '../actions/Animations';


export default class HomeScreen extends React.Component {

    render() {
        return (
        
        <View style={styles.home}>
            <FadeInView>
            <View style={{marginTop: 300, marginBottom:-20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                    style={{width: 55, height: 55, marginTop: 0, marginRight: 8}}
                    source={ghostIcon}
                />
                <Text style={styles.title}>peek-a-boo</Text>
                </View>
                <Text style={styles.normalText}>Be Prepared, Not Scared</Text>
                <View style={{marginTop:215, marginBottom: 270, alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Search')}
                    activeOpacity={0.6}
                    style={[styles.button, { backgroundColor:  '#FF6F00'}]} >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
                </View>
            </View>
            </FadeInView>
        </View>
        );
    }
}  

