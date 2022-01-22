import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
  StatusBar,
  View,
  Text,
  Image,
} from "react-native";
import Icon from "../components/Icon";
import Input from "../components/Input";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle={"dark-content"} />

      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <SafeAreaView style={styles.inner}>
          <Icon style={{ marginBottom: 20 }}></Icon>
          <Navbar></Navbar>
        </SafeAreaView>    

      </Pressable>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
