import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import IconStore from "../screens/IconStore";
import Practise from "../screens/Practise";
import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import BottomTabNavigator from "./TabNavigator";

// create stack
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

//Navigation stacks. 
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{headerLeft: (props) => null, headerShown: false }}  />
      <Stack.Screen name="Practise" component={Practise} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}  />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
}

export default MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}
export { HomeStackNavigator };