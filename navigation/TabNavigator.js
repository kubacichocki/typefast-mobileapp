import React from "react";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator, ContactStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{height:80} }} > 
            <Tab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: () => (<Image source={require("../assets/house.png")} style={{width: 60, height: 60}} />),
                   
                }}

                 />
          <Tab.Screen
                name="ChatTab"
                component={Chat}
                options={{
                    tabBarIcon: () => (<Image source={require("../assets/chat.png")} style={{width: 60, height: 60}} />),
                   
                }}

                 />
         <Tab.Screen
                name="ProfileTab"
                component={Profile}
                options={{
                    tabBarIcon: () => (<Image source={require("../assets/profile.png")} style={{width: 60, height: 60}} />),
                   
                }}

                 />
            <Tab.Screen 
                name="Settings" 
                component={ContactStackNavigator}
                options={{
                    tabBarIcon: () => (<Image source={require("../assets/settings.png")} style={{width: 60, height: 60}} />)
                }}
                
            />
            
        </Tab.Navigator>
        
    );
};
export default BottomTabNavigator;