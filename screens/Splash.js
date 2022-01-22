import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Icon from '../components/Icon';

const Splash = () => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login")
        }, 2000);
    }, []);
    return (
        <View style={styles.center}>
            <Text>Splash Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Splash;