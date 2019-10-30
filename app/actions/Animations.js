import React from 'react';
import { Animated } from 'react-native';

export const FadeInView = (props) => {
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