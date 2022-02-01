import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Pressable, Keyboard, Platform, StatusBar, View} from "react-native";
import Icon from "../components/Icon";
import Input from "../components/Input";
import Button from "../components/Button";
import { auth } from "../Firebase";

const Login = ({ navigation }) => {

  //Use states
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  //Get credentials from google api
  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  //If user is logged in navigate to home
  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("TabNavigator", {screen: "Home"})
      }
    })
    return unsubscribe
  }, [])

  //handle sign up
  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
    })
    .catch(error => alert(error.message))
  }

  //handle sign in
  const handleSighIn = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
    })
    .catch(error=>alert(error.message))
  }
  
  //render login screen
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
            value={email}
            onChangeText={text => setEmail(text)}
            style={{ marginBottom: 20, width: 290 }}
          />
          <Input
            title={"Password"}
            placeholder={"Enter your password..."}
            value={password}
            onChangeText={text => setPassword(text)}
            style={{ marginBottom: 30, width: 290 }}
            secureTextEntry
          />
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button text={"Login"} style={{ margin: 10, width: 100 }} 
            onPress={handleSighIn}/>
            <Button onPress={handleSignUp} text={"Register"} style={{ margin: 10, width: 100 }} />
          </View>
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

export default Login;
