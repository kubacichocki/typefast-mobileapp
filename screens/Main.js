import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Home from "../screens/Home";

import isEmpty from "../utils/isEmpty";

const Stack = createStackNavigator();

export default function Main() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    if (isLoading)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  });

  const Main = ({ navigation }) => {   
    return isLoading ? (
      navigation.navigate("Splash")
    ) : isEmpty(user) ? (
      navigation.navigate("Home")
    ) : (
      navigation.navigate("Home")
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
