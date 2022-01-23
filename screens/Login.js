import React, { useEffect, useState } from "react";
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
import { auth } from "../Firebase";


const Login = ({ navigation }) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("TabNavigator", {screen: "Home"})
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered in with:',user.email)
    })
    .catch(error => alert(error.message))
  }

  const handleSighIn = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:',user.email)
    })
    .catch(error=>alert(error.message))
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

          <Input
            title={"Email"}
            placeholder={"Enter your email..."}
            value={email}
            onChangeText={text => setEmail(text)}
            style={{ marginBottom: 20 }}
          />
          <Input
            title={"Password"}
            placeholder={"Enter your password..."}
            value={password}
            onChangeText={text => setPassword(text)}
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
            <Button text={"Login"} style={{ margin: 10, width: 100 }} 
            onPress={handleSighIn}/>
            {/* // onPress={() => navigation.navigate("TabNavigator", {screen: "Home"})}/> */}
            <Button onPress={handleSignUp} text={"Register"} style={{ margin: 10, width: 100 }} />
          </View>
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
