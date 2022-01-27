import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { auth } from '../Firebase';
import Button from "../components/Button";
const Contact = ({navigation}) => {

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=>{
        navigation.replace("Login", {screen: "Login"})    
    })
    .catch(error => alert(error.messsage))
  }

  return (
    <View style={styles.center}>
      <Text>{auth.currentUser?.email}</Text>
      <Button onPress={handleSignOut} text={"Log out"} style={{ margin: 10, width: 100 }} />
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
export default Contact;