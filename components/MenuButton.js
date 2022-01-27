import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {Text, StyleSheet, Pressable, Image} from 'react-native';
import images from '../utils/images'

const MainMenuButton = ({image, text, onPress, bgColor, bgColorPress, style}) => {

    const [bg, setBg] = React.useState(bgColor);

    return(
        <Pressable style={{...style, ...styles.btn, backgroundColor: bg,}}
        onPress = {onPress}
        onPressIn={() => setBg(bgColorPress)}
        onPressOut={() => setBg(bgColor)}
        >
        {image == '1'? <Image  source={images.controller.uri} style={{height: 100, width: 100}}/> 
        : image == '2'? 
        <Image source={images.challenge.uri} style={{height:100, width: 100}}></Image> : null }
        <Text style={styles.txt}>{text}</Text>
        </Pressable>
    )}

    const styles = StyleSheet.create({
        btn: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 120,
            width: 300,
            borderRadius: 8,
            borderColor: '#333333',
            shadowColor: '#000000', 
            shadowOffset: {
                width: 3,
                height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.62,
            elevation: 4,
            backgroundColor: '#FFFFFF',
    
        },
        txt: {
            fontSize: 25,
            fontWeight: "bold",
            fontStyle: "italic",
            color: '#333333',
            margin: 20
        }
    });


    MainMenuButton.defaultProps = {
        onPress: () => null,
        bgColor: '#FFFFFF',
        bgColorPress: '#F9F9F9',
     
    }
export default MainMenuButton;