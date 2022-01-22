import React from 'react';
import {View, Text, TextInput, StyleSheet, SnapshotViewIOS} from 'react-native';
import {Font} from 'expo';

const Input = ({title, value, onChangeText, placeholder, style, secureTextEntry, error}) => {

    return(
        <View style={style}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style = {styles.input}
                value = {value}
                onChangeText = {onChangeText}
                secureTextEntry = {secureTextEntry}
                placeholder={placeholder}
            />

            {
                error
                &&
                <Text style={styles.error}>{ error }</Text>
            } 
        </View>
    )
};



const styles = StyleSheet.create({

    input: {
        backgroundColor: '#fff',
        height: 50,
        width: 280,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: '#333333',
        shadowColor: '#000000', 
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
    },
    error: {
        marginTop: 5,
        color: '#ac0003',
    },

});


Input.defaultProps = {
    title: 'Title',
    placeholder: 'Placeholder...',
    secureTextEntry: false,
};

export default Input;