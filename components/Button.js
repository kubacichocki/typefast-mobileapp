import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {Text, StyleSheet, Pressable, Image} from 'react-native';
import images from '../utils/images'


const Button = ({image, text, onPress, bgColor, bgColorPress, style}) => {

    const [bg, setBg] = React.useState(bgColor);

    return(
        <Pressable style={{...style, ...styles.btn, backgroundColor: bg,}}
        onPress = {onPress}
        onPressIn={() => setBg(bgColorPress)}
        onPressOut={() => setBg(bgColor)}
        >
        {image == '1'? <Image  source={images.google.uri} style={{height: 25, width: 25}}/> : null }
        <Text style={styles.text}>{text}</Text>
        </Pressable>
    )}


const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 8,
        borderColor: '#333333',
        shadowColor: '#000000', 
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.23,
        backgroundColor: '#FFFFFF'

    },
    txt: {
        fontSize: 17,
        color: '#333333',
    }
});

Button.defaultProps = {
    text: 'Button',
    onPress: () => null,
    bgColor: '#FFFFFF',
    bgColorPress: '#F9F9F9',
 
}

export default Button;