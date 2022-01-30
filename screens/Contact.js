import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { auth } from '../Firebase';
import Button from "../components/Button";
const Contact = ({navigation}) => {


  return (
    <View style={styles.center}>
      <ScrollView>

      </ScrollView>
      
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