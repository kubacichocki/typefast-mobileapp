import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Icon from '../components/Icon';
import { auth, firebase } from '../Firebase';


const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login", {screen:"Login"})
        }, 1000);
    }, []);
    return (
        <View style={styles.center}>
           <Icon></Icon>
        </View>
    );
};
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
});
export default Splash;