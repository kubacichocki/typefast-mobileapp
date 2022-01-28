import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";

const Practise = () => {

    const text ="While docking with the Endurance, Cooper calls out distances in feet. NASA uses the metric system, so he should have been calling the distances in meters. Of course, since it was a while since he worked for NASA, such mistakes were bound to happen.";
    const [bgcolor, setBackGroundColor] = useState("red")

    const validateText = (item) =>{

        if(item===text.slice(0,item.length)){
            setBackGroundColor("green")
        }else{
            setBackGroundColor("red")
        }
    }
  
  return (
    <View style={styles.center}>

      <Text style={styles.score}>Time: 25s 134wpm</Text>
      <Text style={styles.txt}>{text}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TextInput
            title=""
            style={{        color: bgcolor,
                width: 300, margin: 5,
                backgroundColor: '#fff',
                height: 50,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 10,
                borderColor: '#333333',
                shadowColor: '#000000', 
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                backgroundColor: '#FFFFFF',}}
            // inputStyle = {{color: 'red'}}
            placeholder="Type here..."
            placeholderTextColor="#aaaaaa"
            onChangeText={text => validateText(text)}
            //   onChangeText={(text) => setMessage(text)}
            //   value={message}
            autoCapitalize="none"
          />
          {/* <Button text="Send" style={{ width: 100 }} onPress={setIsStopwatchStart}/>
          <Button text="Stop" style={{ width: 100 }} onPress={setResetStopwatch}/> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  score: {
    marginTop: 40,
    fontWeight: "bold",
  },
  txt: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "200",
    width: 290,
    textAlign: "justify", 
    },
});
export default Practise;
