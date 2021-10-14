import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from './components/icon';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js!</Text> */}
      <Icon
        text={'Copyright'}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
