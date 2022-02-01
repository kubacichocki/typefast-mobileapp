import React from "react";
import { StyleSheet, Pressable, Keyboard, SafeAreaView, KeyboardAvoidingView, StatusBar } from "react-native";
import MainMenuButton from "../components/MenuButton";
import Icon from "../components/Icon";

//Main menu screen
const Home = ({ navigation }) => {
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
          />
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

//Styling
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
