import React from "react";
import { StyleSheet, Pressable, Keyboard, SafeAreaView, KeyboardAvoidingView, StatusBar, Text, Alert } from "react-native";
import MainMenuButton from "../components/MenuButton";
import Icon from "../components/Icon";

//Main menu screen
const Home = ({ navigation }) => {

  //Alert 
    const alertTrigger = () => {
    Alert.alert("Alert","\nChallenge mode is coming soon. \nStay tuned!",
    [
        {
          text: "OK",
          style: "default",
        },
    ],
    );
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle={"dark-content"} />
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <SafeAreaView style={styles.inner}>
          <Icon style={{ marginBottom: 20 }}></Icon>
          <MainMenuButton
            image="1"
            text={"Practise"}
            style={{ margin: 10, width: 290, flexDirection: "row" }}
            onPress={() => navigation.navigate("Practise")}
          />
          <MainMenuButton
            image="2"
            text={"Challenge"}
            style={{ margin: 10, width: 290, flexDirection: "row" }}
            onPress={alertTrigger}
          />
          <Text style={styles.textstyle}>Remember to turn off auto-correction before you start practising!</Text>
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textstyle: {
    fontSize: 20,
    fontWeight: '200',
    marginHorizontal: 50,
    textAlign: "justify",
  }
});


export default Home;
