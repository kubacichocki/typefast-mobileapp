import React from "react";
import { Image, Text, StyleSheet, Pressable, View } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons";
import images from "../utils/images";
import HomeScreen from "../screens/Home";
const homeName = 'Home';
const Tab = createBottomTabNavigator();


// const Navbar = ({ onPress, bgColor, bgColorPress, style }) => {
//   const [bg, setBg] = React.useState(bgColor);
//   return (
    
//   );
// };

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 110,
    padding: 2,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
        shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,    
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#FFFFFF",

  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 8,
    borderColor: "#333333",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#FFFFFF",
  },
  txt: {
    fontSize: 17,
    color: "#333333",
  },
  img: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
  },
});

Navbar.defaultProps = {
  onPress: () => null,
  bgColor: "#FFFFFF",
  bgColorPress: "#F9F9F9",
};

export default Navbar;
