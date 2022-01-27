import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contact";
import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import BottomTabNavigator from "./TabNavigator";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{headerLeft: (props) => null, headerShown: false }}  />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}  />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
}
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Contact} options={{ headerLeft: (props) => null }} />
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
export { HomeStackNavigator, ContactStackNavigator };