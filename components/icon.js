import React from 'react';
import {Text, Image, View, StyleSheet} from "react-native";

const Icon = ({text, style}) => {
    return(
        <View style = {{...style, ...styles.container}}>
            <Image
                source= {require('../assets/logo.png')}
                style = {styles.img}
            />
            <Text style={styles.txt}>{ text }</Text>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 400,
        height: 400,
    },
    txt: {
        fontSize: 32,
        fontWeight: '600',
        marginTop: 5,

    }
})


Icon.defaultProps = {
    text: 'App test'
};

export default Icon;