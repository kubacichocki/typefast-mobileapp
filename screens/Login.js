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

const Login = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle={"dark-content"} />

      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <SafeAreaView style={styles.inner}>
          <Icon style={{ marginBottom: 20 }}></Icon>

          <Input
            title={"Email"}
            placeholder={"Enter your email..."}
            style={{ marginBottom: 20 }}
          />
          <Input
            title={"Password"}
            placeholder={"Enter your password..."}
            style={{ marginBottom: 30 }}
            secureTextEntry
          />

          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button text={"Login"} style={{ margin: 10, width: 100 }} />
            <Button text={"Register"} style={{ margin: 10, width: 100 }} />
          </View>
        <Button image='1' text={"Continue with Google"} style={{margin: 10, width:290}}/>
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

export default Login;